const uploadBtn = document.getElementById("uploadBtn");
const songsContainer = document.getElementById("songsContainer");

const totalSongs = document.getElementById("totalSongs");
const totalPlays = document.getElementById("totalPlays");

let uploadedSongs =
JSON.parse(localStorage.getItem("uploadedSongs")) || [];

let plays = 0;

function updateStats(){

  totalSongs.innerText = uploadedSongs.length;

  totalPlays.innerText = plays;

}

function displaySongs(){

  songsContainer.innerHTML = "";

  uploadedSongs.forEach((song,index)=>{

    const div = document.createElement("div");

    div.classList.add("song-card");

    div.innerHTML = `
      <img src="${song.cover}">

      <h3>${song.title}</h3>

      <p>${song.artist}</p>

      <audio controls class="audioPlayer">
        <source src="${song.audio}">
      </audio>

      <button class="delete-btn"
      onclick="deleteSong(${index})">
      Delete Song
      </button>
    `;

    songsContainer.appendChild(div);

  });

  const players =
  document.querySelectorAll(".audioPlayer");

  players.forEach(player=>{

    player.addEventListener("play",()=>{

      plays++;

      updateStats();

    });

  });

}

displaySongs();

updateStats();

uploadBtn.addEventListener("click",()=>{

  const title =
  document.getElementById("songTitle").value;

  const artist =
  document.getElementById("artistName").value;

  const songFile =
  document.getElementById("songFile").files[0];

  const coverFile =
  document.getElementById("coverFile").files[0];

  if(!title || !artist || !songFile || !coverFile){

    alert("Please fill all fields");

    return;

  }

  const reader = new FileReader();

  reader.onload = function(e){

    const song = {

      title:title,

      artist:artist,

      audio:URL.createObjectURL(songFile),

      cover:e.target.result

    };

    uploadedSongs.push(song);

    localStorage.setItem(
      "uploadedSongs",
      JSON.stringify(uploadedSongs)
    );

    displaySongs();

    updateStats();

    alert("Song Uploaded");

  };

  reader.readAsDataURL(coverFile);

});

function deleteSong(index){

  uploadedSongs.splice(index,1);

  localStorage.setItem(
    "uploadedSongs",
    JSON.stringify(uploadedSongs)
  );

  displaySongs();

  updateStats();

}