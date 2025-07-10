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
      if (!res.ok) throw new Error('Failed to fetch odds');
      const data = await res.json();
      allOdds = data;
      sortOdds();
    } catch (e) {
      eventsContainer.innerHTML = "Failed to load events. Check console for details.";
      console.error(e);
    }
  }

  async function loadHeadlines() {
    try {
      const res = await fetch("/api/headlines");
      if (!res.ok) throw new Error('Failed to fetch headlines');
      const data = await res.json();
      headlinesList.innerHTML = "";
      data.forEach(headline => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${headline.link}" target="_blank">${headline.title}</a> (${headline.source})`;
        headlinesList.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      headlinesList.innerHTML = "Failed to load headlines. Check console for details.";
    }
  }

  function sortOdds() {
    let sorted = [...allOdds];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'odds') {
      sorted.sort((a, b) => a.odds[0].value - b.odds[0].value);
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

  chatButton.addEventListener("click", () => {
    const input = chatInput.value.toLowerCase();
    if (!input) return;
    let talk = "What’s your bet? Another flop like your life?";
    if (input.includes('wrestling')) talk = "That match? Even Vince wouldn’t book that crap!";
    if (input.includes('bet')) talk = "Your bet’s so weak, it’s like betting on a heel turn in a dark match!";
    responseP.textContent = talk;
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
