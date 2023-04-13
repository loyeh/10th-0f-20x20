const tracks = ["Kalimba", "Maid with the Flaxen Hair", "Sleep Away"];
const audio_track = document.getElementById("audio_track");
const audio_img = document.getElementById("audio_img");
const progress_bar = document.getElementById("progress_bar");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const image_container = document.querySelector(".image_container");
const progress_container = document.querySelector(".progress_container");

let trackNumber = 0;

function previous() {
  trackNumber--;
  if (trackNumber < 0) {
    trackNumber = 2;
  }
  audio_track.src = `audio/${tracks[trackNumber]}.mp3`;
  audio_img.src = `img/${tracks[trackNumber]}.jpg`;
  title.innerText = tracks[trackNumber];
  play_track();
}

function next() {
  trackNumber++;
  if (trackNumber > 2) {
    trackNumber = 0;
  }
  audio_track.src = `audio/${tracks[trackNumber]}.mp3`;
  audio_img.src = `img/${tracks[trackNumber]}.jpg`;
  title.innerText = tracks[trackNumber];

  play_track();
}

function play_track() {
  playBtn.className = "fa-solid fa-pause";

  progress_container.style.bottom = "80px";
  if (image_container.classList.contains("active")) {
    audio_track.play();
  } else {
    image_container.classList.add("active");
    audio_track.play();
  }
}

function pause_track() {
  playBtn.className = "fa-solid fa-play";
  audio_track.pause();
  progress_container.style.bottom = "0px";
  if (image_container.classList.contains("active")) {
    image_container.classList.remove("active");
    audio_track.pause();
  } else {
    audio_track.pause();
  }
}

playBtn.addEventListener("click", () => {
  if (image_container.classList.contains("active")) {
    image_container.classList.remove("active");
    pause_track();
  } else {
    image_container.classList.add("active");
    play_track();
  }
});

audio_track.onplay = function (event) {
  console.log(event);
};

//event listeners
nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", previous);
audio_track.addEventListener("timeupdate", () => {
  progress_bar.value = (audio_track.currentTime / audio_track.duration) * 100;
});
progress_bar.addEventListener("input", () => {
  audio_track.currentTime = (progress_bar.value * audio_track.duration) / 100;
});
audio_track.addEventListener("ended", next);
