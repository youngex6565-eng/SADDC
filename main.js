const songs = [
  {
    title: "SoundHelix Song 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },

  {
    title: "SoundHelix Song 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },

  {
    title: "SoundHelix Song 3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const playlist = document.getElementById("playlist");
const uploadInput = document.getElementById("upload");

let currentSong = 0;

function loadSong(index) {
  audio.src = songs[index].src;
  title.innerText = songs[index].title;
}

function renderPlaylist() {
  playlist.innerHTML = "";

  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.innerText = song.title;

    div.onclick = () => {
      currentSong = index;
      loadSong(index);
      audio.play();
    };

    playlist.appendChild(div);
  });
}

loadSong(currentSong);
renderPlaylist();

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  audio.play();
});

prevBtn.addEventListener("click", () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);
  audio.play();
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progress.value =
    (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime =
    (progress.value / 100) * audio.duration;
});

uploadInput.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);

  files.forEach((file) => {
    const fileUrl = URL.createObjectURL(file);
    songs.push({
      title: file.name.replace(/\.[^/.]+$/, ""),
      src: fileUrl
    });
  });

  renderPlaylist();
});