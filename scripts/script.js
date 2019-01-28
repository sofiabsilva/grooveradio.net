const player = document.querySelector('.player')
const currentSection = document.querySelector('.currentSection')
const recentSongs = document.querySelector('#recentSongs')
player.addEventListener('click', toggleAudio)

const interval = 4000;

window.onload = currentSongs;

let audio = new Audio();

function playAudio () {
  audio.src = 'http://europa.shoutca.st:8648/;'
  audio.play();
  console.log('playing');
}

function stopAudio () {
  audio.pause()
  audio.src = ''
  audio = new Audio()
}

function currentSongs () {
  const songInfo = document.querySelector('#currentSong')
  let content
  if (typeof (content) === 'undefined') {
    currentSection.style.visibility = "hidden"
    player.style.visibility = "hidden"
  }
  $.getJSON('https://europa.shoutca.st/rpc/atsueste/streaminfo.get', function (data) {
    content = `<img class="albumCover" src=${data.data[0]['track']['imageurl']} alt="album cover"><ul>
    <li class="artist">${data.data[0]['track']['artist']}</li>
    <li class="songTitle">${data.data[0]['track']['title']}</li>
    </ul>`
    songInfo.innerHTML = content
  })
  currentSection.style.visibility = "visible"
  player.style.visibility = "visible"
}


function toggleAudio () {
  if (player.getAttribute('src') === "images/Groove_Play_128.png") {
    playAudio();
    player.src = "images/Groove_Stop_128.png"
  }
  else if (player.getAttribute('src') === "images/Groove_Stop_128.png") {
    stopAudio();
    player.src = "images/Groove_Play_128.png"
  }
}


function displayLastSongs() {
  let content
  let loader = document.querySelector('.loading')
  $.getJSON('https://europa.shoutca.st/recentfeed/atsueste/json/', function (data) {
    content = `<ul id ='airedList'>`
    let lastFive = Object.entries(data.items).slice(1, 6)
    for (let i = 0; i < lastFive.length; i++) {
      content += `<li>
      <img class='albumCover' src="${lastFive[i][1]['enclosure']['url']}" alt="${lastFive[i][1]['description']}">
      ${lastFive[i][1]['title']}</li>`
    }
    content += `</ul>`
    recentSongs.innerHTML = content
  })
};

// // Update song info every 4 seconds
// setInterval(currentSongs, interval)
let switchInterval;
function intervalHandler() {
  switchInterval = setInterval(function() {
    if (document.visibilityState === "visible") {
      displayLastSongs();
      currentSongs();
    } else {
      return;
    }
  }, interval);
}

intervalHandler();

(adsbygoogle = window.adsbygoogle || []).push({});
