const weddingDate = new Date("November 11, 2026 19:30:00").getTime();

function openEnvelope() {
  document.querySelector(".envelope").classList.add("open");
  startMusic();
  burstPetals();

  setTimeout(() => {
    document.getElementById("hero").classList.add("hidden");
    document.getElementById("save").classList.remove("hidden");
    document.body.classList.remove("lock");
    document.getElementById("save").scrollIntoView();
  }, 1800);
}

function goScratch() {
  document.getElementById("save").classList.add("hidden");
  document.getElementById("scratch").classList.remove("hidden");
  document.getElementById("scratch").scrollIntoView();
  setTimeout(startScratch, 100);
}

function showInvite() {
  document.getElementById("scratch").classList.add("hidden");
  document.getElementById("invite").classList.remove("hidden");
  document.getElementById("invite").scrollIntoView();
  startCountdown();
  burstPetals();
}

function startScratch() {
  const canvas = document.getElementById("scratchCanvas");
  const box = document.querySelector(".scratch-box");
  const ctx = canvas.getContext("2d");

  canvas.width = box.offsetWidth;
  canvas.height = box.offsetHeight;

  ctx.globalCompositeOperation = "source-over";

  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#aa7a20");
  grad.addColorStop(0.5, "#e8c76b");
  grad.addColorStop(1, "#9f701c");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,.95)";
  ctx.font = "28px Cormorant Garamond";
  ctx.textAlign = "center";
  ctx.fillText("Scratch Here", canvas.width / 2, canvas.height / 2);

  ctx.font = "18px Poppins";
  ctx.fillText("✨ reveal the date ✨", canvas.width / 2, canvas.height / 2 + 35);

  let drawing = false;

  function getPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;

    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  function scratch(e) {
    if (!drawing) return;

    e.preventDefault();
    const position = getPosition(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(position.x, position.y, 25, 0, Math.PI * 2);
    ctx.fill();
  }

  canvas.onmousedown = () => drawing = true;
  canvas.onmouseup = () => drawing = false;
  canvas.onmouseleave = () => drawing = false;
  canvas.onmousemove = scratch;

  canvas.ontouchstart = () => drawing = true;
  canvas.ontouchend = () => drawing = false;
  canvas.ontouchmove = scratch;
}

function startCountdown() {
  setInterval(() => {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    if (gap <= 0) return;

    document.getElementById("days").innerText = Math.floor(gap / (1000 * 60 * 60 * 24));
    document.getElementById("hours").innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("mins").innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("secs").innerText = Math.floor((gap % (1000 * 60)) / 1000);
  }, 1000);
}

function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const source = audio.querySelector("source").getAttribute("src");

  if (!source) {
    alert("Add your soft music MP3 link in index.html first.");
    return;
  }

  audio.paused ? audio.play() : audio.pause();
}

function startMusic() {
  const audio = document.getElementById("bgMusic");
  const source = audio.querySelector("source").getAttribute("src");

  if (source) {
    audio.play().catch(() => {});
  }
}

function burstPetals() {
  for (let i = 0; i < 28; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.innerText = ["🌸", "✨", "🤍", "🌙"][Math.floor(Math.random() * 4)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (3 + Math.random() * 3) + "s";
    petal.style.animationDelay = (Math.random() * 1) + "s";

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 6500);
  }
}
