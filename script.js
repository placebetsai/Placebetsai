document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const eventsContainer = document.getElementById("events");
  const headlinesList = document.getElementById("news-headlines");
  const chatInput = document.getElementById("chat-input");
  const chatButton = document.getElementById("chat-button");
  const responseP = document.getElementById("response");
  let allOdds = [];
  let displayedOdds = 10;

  async function loadOdds() {
    try {
      const res = await fetch("/api/odds");
      if (!res.ok) throw new Error('Failed to fetch odds');
      const data = await res.json();
      allOdds = data;
      displayOdds(data.slice(0, displayedOdds));
    } catch (e) {
      eventsContainer.innerHTML = "Failed to load events.";
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
      headlinesList.innerHTML = "Failed to load headlines.";
    }
  }

  function displayOdds(odds) {
    eventsContainer.innerHTML = "";
    odds.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      const title = `${event.home_team} vs ${event.away_team}`;
      let content = "";
      event.bookmakers.forEach(bm => {
        const h2h = bm.markets.find(m => m.key === "h2h");
        if (h2h) {
          const oddsText = h2h.outcomes.map(o => `${o.name} ${o.price > 0 ? '+' : ''}${o.price}`).join(" | ");
          content += `${bm.title}: ${oddsText}<br>`;
        }
      });
      card.innerHTML = `<h3>${title}</h3>${content}`;
      eventsContainer.appendChild(card);
    });
    if (allOdds.length > displayedOdds) {
      const showMore = document.createElement("button");
      showMore.textContent = "Show More";
      showMore.onclick = () => {
        displayedOdds += 10;
        displayOdds(allOdds.slice(0, displayedOdds));
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
});
