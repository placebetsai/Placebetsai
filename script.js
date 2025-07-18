document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const eventsContainer = document.getElementById("events");
  const headlinesList = document.getElementById("news-headlines");
  const chatInput = document.getElementById("chat-input");
  const chatButton = document.getElementById("chat-button");
  const responseP = document.getElementById("response");
  let allOdds = [];
  let displayedOdds = 10;
  let sortBy = 'date'; // Default sort

  async function loadOdds() {
    try {
      const res = await fetch("/api/odds");
      if (!res.ok) throw new Error(`API error: ${res.status} - ${await res.text()}`);
      const data = await res.json();
      allOdds = data;
      sortOdds();
    } catch (e) {
      console.error("Odds fetch failed, using fallback data:", e);
      allOdds = [
        { event: "Yankees vs Mariners", date: "2025-07-10", odds: [{ source: "FanDuel", value: "-109" }], bookiePrediction: "Mariners will crush, you clown!" },
        { event: "Dodgers vs Giants", date: "2025-07-11", odds: [{ source: "Bet365", value: "+120" }], bookiePrediction: "Dodgers edge it, loser!" },
      ];
      sortOdds();
    }
  }

  async function loadHeadlines() {
    try {
      const res = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://sports.yahoo.com/rss/"));
      if (!res.ok) throw new Error(`API error: ${res.status} - ${await res.text()}`);
      const text = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");
      const headlines = [];
      for (let i = 0; i < Math.min(5, items.length); i++) {
        const item = items[i];
        headlines.push({
          title: item.getElementsByTagName("title")[0].textContent,
          link: item.getElementsByTagName("link")[0].textContent,
          source: "Yahoo Sports"
        });
      }
      headlinesList.innerHTML = "";
      headlines.forEach(headline => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${headline.link}" target="_blank">${headline.title}</a> (${headline.source})`;
        headlinesList.appendChild(li);
      });
    } catch (err) {
      console.error("Headlines fetch failed, using fallback data:", err);
      headlinesList.innerHTML = "<li><a href='https://sports.yahoo.com/news/' target='_blank'>No news available</a> (Yahoo Sports)</li>";
    }
  }

  function sortOdds() {
    let sorted = [...allOdds];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'odds') {
      sorted.sort((a, b) => parseFloat(a.odds[0].value) - parseFloat(b.odds[0].value));
    }
    displayOdds(sorted.slice(0, displayedOdds));
  }

  function displayOdds(odds) {
    eventsContainer.innerHTML = "";
    odds.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      const title = `${event.event} (${new Date(event.date).toLocaleDateString()})`;
      let content = "";
      event.odds.forEach(o => {
        content += `${o.source}: ${o.value}<br>`;
      });
      card.innerHTML = `<h3>${title}</h3>${content}<p class="bookie-blurb">${event.bookiePrediction}</p>`;
      eventsContainer.appendChild(card);
    });
    if (allOdds.length > displayedOdds) {
      const showMore = document.createElement("button");
      showMore.className = "show-more";
      showMore.textContent = "Show More";
      showMore.onclick = () => {
        displayedOdds += 10;
        sortOdds();
      };
      eventsContainer.appendChild(showMore);
    }
  }

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".event-card");
    cards.forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      sortOdds();
    });
  }

  chatButton.addEventListener("click", async () => {
    const input = chatInput.value.toLowerCase();
    if (!input) return;
    responseP.textContent = "Thinking...";

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.XAI_API_KEY // Your API key in Vercel
        },
        body: JSON.stringify({
          model: "grok-beta",
          messages: [
            { role: "system", content: "You are a trash talking bookie. Respond with relevant sports predictions, reasoning, and sarcastic roasts based on current odds and stats. Use team performance, pitcher stats, or recent news if available." },
            { role: "user", content: input }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      responseP.textContent = data.choices[0].message.content;
    } catch (error) {
      responseP.textContent = "Failed to get response. Try again, loser!";
      console.error(error);
    }
    chatInput.value = "";
  });

  loadOdds();
  loadHeadlines();

  // Animated Matrix background
  const canvas = document.createElement("canvas");
  canvas.id = "matrix";
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const binary = '01';
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = Array.from({length: columns}, () => 1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px arial';
    for (let i = 0; i < drops.length; i++) {
      const text = binary[Math.floor(Math.random() * binary.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 33);

  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });
});
