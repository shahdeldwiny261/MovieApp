const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  window.location.href = "login.html";
}



const API_KEY = "58321ede2585db25bfae897f5678c712";

const endpoints = {
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  trending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
  top: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  now: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
};

let movies = [];
let currentIndex = 0;

/*  HERO */
async function getHero() {
  const res = await fetch(endpoints.popular);
  const data = await res.json();

  movies = data.results;

  showHero();
  setInterval(() => {
    currentIndex = (currentIndex + 1) % movies.length;
    showHero();
  }, 5000);
}

function showHero() {
  const movie = movies[currentIndex];

  document.querySelector(".hero").style.backgroundImage =
    `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

  document.getElementById("hero-title").innerText = movie.title;
  document.getElementById("hero-desc").innerText = movie.overview;
  document.getElementById("hero-rate").innerText = "⭐ " + movie.vote_average;
}

/*  SECTIONS */
async function loadSection(url, id) {
  const res = await fetch(url);
  const data = await res.json();
  render(data.results, id);
}


function render(list, id) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  list.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");

    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;

    div.onclick = () => {
      document.getElementById("modal").style.display = "flex";
      document.getElementById("m-title").innerText = movie.title;
      document.getElementById("m-desc").innerText = movie.overview;
      document.getElementById("m-rate").innerText = "⭐ " + movie.vote_average;
    };

    container.appendChild(div);
  });
}

/*  SEARCH */
document.getElementById("search").addEventListener("input", async (e) => {
  const q = e.target.value;

  if (q === "") {
    init();
    return;
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`
  );

  const data = await res.json();
  render(data.results, "popular");
});

/*  MODAL */
document.getElementById("close").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

/* INIT */
function init() {
  getHero();
  loadSection(endpoints.popular, "popular");
  loadSection(endpoints.trending, "trending");
  loadSection(endpoints.top, "toprated");
  loadSection(endpoints.now, "nowplaying");
}

init();



const userArea = document.getElementById("user-area");

if (userArea && user) {
  userArea.innerHTML = `
    <span>Hi, ${user.username}</span>
    <button onclick="logout()">Logout</button>
  `;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}