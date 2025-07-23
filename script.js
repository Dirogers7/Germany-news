// Get Germany time
async function fetchTime() {
  const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Berlin");
  const data = await res.json();
  const date = new Date(data.datetime);
  document.getElementById("time").innerText = date.toLocaleTimeString("de-DE");
}
fetchTime();
setInterval(fetchTime, 60000); // Update every 60s

// Get news (using RSS feed via rss2json proxy)
async function fetchNews() {
  const feedURL = "https://www.spiegel.de/international/index.rss";
  const apiURL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedURL)}`;
  const res = await fetch(apiURL);
  const data = await res.json();
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = "";

  data.items.slice(0, 5).forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
    newsList.appendChild(li);
  });
}
fetchNews();