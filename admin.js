const songsContainer =
document.getElementById("songsContainer");

const totalArtists =
document.getElementById("totalArtists");

const totalSongs =
document.getElementById("totalSongs");

const totalUsers =
document.getElementById("totalUsers");

/* GET DATA */

let uploadedSongs =
JSON.parse(localStorage.getItem("uploadedSongs")) || [];

let users =
JSON.parse(localStorage.getItem("users")) || [];

/* UPDATE STATS */

function updateStats(){

  totalSongs.innerText =
  uploadedSongs.length;

  totalUsers.innerText =
  users.length;

  /* COUNT UNIQUE ARTISTS */

  const artistNames =
  [...new Set(
    uploadedSongs.map(song => song.artist)
  )];

  totalArtists.innerText =
  artistNames.length;

}

/* DISPLAY SONGS */

function displaySongs(){

  songsContainer.innerHTML = "";

  uploadedSongs.forEach((song,index)=>{

    const div = document.createElement("div");

    div.classList.add("song-card");

    div.innerHTML = `
      <img src="${song.cover}">

      <h3>${song.title}</h3>

      <p>${song.artist}</p>

      <audio controls>
        <source src="${song.audio}">
      </audio>

      <button class="delete-btn"
      onclick="deleteSong(${index})">
      Delete Song
      </button>
    `;

    songsContainer.appendChild(div);

  });

}

/* DELETE SONG */

function deleteSong(index){

  uploadedSongs.splice(index,1);

  localStorage.setItem(
    "uploadedSongs",
    JSON.stringify(uploadedSongs)
  );

  displaySongs();

  updateStats();

}

displaySongs();

updateStats();