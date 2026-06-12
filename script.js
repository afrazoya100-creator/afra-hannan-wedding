function openInvite() {
  document.getElementById("hero").style.display = "none";
  document.getElementById("invite").classList.remove("hidden");

  const music = document.getElementById("music");
  music.volume = 0.35;
  music.play().catch(() => {});

  startPetals();
}

function startPetals() {
  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.innerHTML = "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 7000);
  }, 600);
}

const weddingDate = new Date("November 11, 2026 19:30:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = weddingDate - now;

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((gap / (1000 * 60)) % 60);
  const secs = Math.floor((gap / 1000) % 60);

  document.getElementById("timer").innerHTML =
    `${days} Days <br> ${hours} Hours ${mins} Minutes ${secs} Seconds`;
}, 1000);

function addCalendar(eventName) {
  alert("Calendar option can be added after final date, time and venue are fixed 🤍");
}
