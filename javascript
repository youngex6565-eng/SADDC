const songs = [];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const playlist = document.getElementById("playlist");

let currentSong = 0;

function loadSong(index){

  audio.src = songs[index].src;
  title.innerText = songs[index].title;

}

function renderPlaylist(){

  playlist.innerHTML = "";

  songs.forEach((song, index) => {

    const div = document.createElement("div");

    div.classList.add("song");

    div.innerText = song.title;

    div.onclick = () => {

      currentSong = index;

      loadSong(index);

      audio.play();

      playBtn.innerText = "⏸";

    };

    playlist.appendChild(div);

  });

}

playBtn.addEventListener("click", () => {

  if(songs.length === 0) return;

  if(audio.paused){

    audio.play();

    playBtn.innerText = "⏸";

  }else{

    audio.pause();

    playBtn.innerText = "▶";

  }

});

nextBtn.addEventListener("click", () => {

  if(songs.length === 0) return;

  currentSong++;

  if(currentSong >= songs.length){
    currentSong = 0;
  }

  loadSong(currentSong);

  audio.play();

});

prevBtn.addEventListener("click", () => {

  if(songs.length === 0) return;

  currentSong--;

  if(currentSong < 0){
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);

  audio.play();

});

audio.addEventListener("timeupdate", () => {

  progress.value =
    (audio.currentTime / audio.duration) * 100;

});

progress.addEventListener("input", () => {

  audio.currentTime =
    (progress.value / 100) * audio.duration;

});

const upload = document.getElementById("upload");

upload.addEventListener("change", (e) => {

  const files = e.target.files;

  for(let i = 0; i < files.length; i++){

    const file = files[i];

    const song = {
      title: file.name,
      src: URL.createObjectURL(file)
    };

    songs.push(song);

  }

  renderPlaylist();

  if(songs.length > 0){

    loadSong(0);

  }

});