let btn = document.querySelector("#play");
let play = false;
let close = document.querySelector(".close");
let box1 = document.querySelector(".box1");
let uldiv = document.querySelector(".ul");
let classimg = document.querySelector(".card-img");
let main = document.querySelector(".main");
let mpp1 = document.querySelector(".mpp1");
let ok = true;
let heart = document.querySelector(".mpp2");
let currentAudio;
let box = document.querySelector(".box");
let ul = document.createElement("ul");

let audioFiles = [
  "play/clan.mp3",
  "play/woman.m4a",
  "play/meta.mp3",
  "play/amplifier.mp3",
  "play/naja.mp3",
  "play/paisa.mp3",
  "play/rideit.mp3",
  "play/starboy.mp3",
  "play/infected.mp3",
  "play/bikhra.mp3",
];

let audioElements = audioFiles.map((file) => new Audio(file));
let audio=audioElements[9];
heart.addEventListener("click", () => {
  if (ok) {
    heart.style.color = "red";
    ok = false;
  } else {
    heart.style.color = "white";
    ok = true;
  }
});

let badge = document.querySelector(".badge");
badge.addEventListener("click", () => {
  box.style.transition = "0.5s";
  box.style.height = "16rem";

  for (let i = 0; i < 10; i++) {
    let li = document.createElement("li");
    li.innerText = i;
    ul.appendChild(li);
  }
  box.innerHTML = "";
  box.appendChild(ul);
  close.style.display = "block";
  box.appendChild(close);
});

close.addEventListener("click", () => {
  box.appendChild(box1);
  box.removeChild(close);
  box.removeChild(ul);
  box.style.height = "8rem";
  box.style.transition = "0.5s";
});

let img = document.querySelector("#smallpic");
let singerName = document.querySelector("#singer-name");
let titleElement = document.querySelector("#song-name");
let infoElement = document.querySelector(".card-info");

function change(im, audi, title, info) {
  img.src = im;
  audio = audi;
  singerName.innerText = info;
  titleElement.innerText = title;
}

let card1 = document.querySelectorAll(".card");
card1.forEach((card) => {
  const imgele = card.querySelector(".card-img");
  const titleElement = card.querySelector(".card-title");
  const infoElement = card.querySelector(".card-info");
  const index = card.getAttribute("data-index");

  card.addEventListener("click", () => {
    let au = index;
    let tit = titleElement.textContent;
    let info = infoElement.textContent;

    let clickedAudio = audioElements[au];
    change(imgele.src, clickedAudio, tit, info);
    okji(clickedAudio);

    let progress = document.querySelector("#rg");
    let currtime = document.querySelector(".curr-time");
    
    progress.addEventListener("input", () => {
      audio.currentTime = (audio.duration * progress.value) / 100;
    });

    audio.addEventListener("timeupdate", () => {
      let progressValue = (audio.currentTime / audio.duration) * 100;
      progress.value = progressValue;

      let minutes = Math.floor(audio.currentTime / 60);
      let seconds = Math.floor(audio.currentTime % 60);

      currtime.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    });
  });
});
 
async function playmus(audio) {
  if (!play) {
  
    btn.classList.remove("fa-circle-play");
    btn.classList.add("fa-circle-pause");
    await audio.play();
    play = true;
    console.log("play");
  } else {
  
    btn.classList.add("fa-circle-play");
    btn.classList.remove("fa-circle-pause");
    audio.pause();
    console.log("paused");
    play = false;
  }
}

btn.addEventListener("click", async () => {
  let minutes = Math.floor(audio.duration / 60);
  let seconds = Math.floor(audio.duration % 60);
  let maxtime = document.querySelector(".tot-time");
  maxtime.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  await playmus(currentAudio);
});

function okji(audio) {
  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
  }
  currentAudio = audio;
  playmus(audio);
}
let vol = document.querySelector("#customRange");
vol.addEventListener("input", () => {
  currentAudio.volume = vol.value/100;
});

let volu = document.querySelector("#vol");
let on = false;
volu.addEventListener("click", () => {
  if (!on) {
    vol.style.display = "flex";
    on = true;
  }
  else {
    vol.style.display = "none";
    on = false;
  }
 });
