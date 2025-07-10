const searchInput = document.getElementById("search");
const eventsContainer = document.getElementById("events");
const headlinesList = document.getElementById("news-headlines");

async function loadOdds() {
  try {
    const res = await fetch("https://placebets-api.vercel.app/api/odds");
    const data = await res.json();

    eventsContainer.innerHTML = "";

    data.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";

      const title = `<b>${event.home_team} vs ${event.away_team}</b>`;
      let content = "";

      event.bookmakers.forEach(bm => {
        const h2h = bm.markets.find(m => m.key === "h2h");
        if (h2h) {
          const odds = h2h.outcomes.map(o => `${o.name} ${o.price > 0 ? '+' : ''}${o.price}`).join(" | ");
          content += `<em>${bm.title}:</em> ${odds}<br/>`;
        }
      });

      card.innerHTML = `${title}<br/>${content}`;
      eventsContainer.appendChild(card);
    });
  } catch (e) {
    eventsContainer.innerHTML = "Failed to load events.";
    console.error(e);
  }
}

async function loadHeadlines() {
  try {
    const res = await fetch("https://placebets-api.vercel.app/api/headlines");
    const data = await res.json();
    headlinesList.innerHTML = "";

    data.forEach(headline => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${headline.link}" target="_blank">${headline.title}</a>`;
      headlinesList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    headlinesList.innerHTML = "<li>Failed to load headlines.</li>";
  }
}

searchInput.addEventListener("input", () => {
  const cards = document.querySelectorAll(".event-card");
  const q = searchInput.value.toLowerCase();
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? "block" : "none";
  });
});

loadOdds();
loadHeadlines();
