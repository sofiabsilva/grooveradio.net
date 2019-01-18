const player = document.querySelector('.player')
const currentSection = document.querySelector('.currentSection')
player.addEventListener('click', toggleAudio)

window.onload = currentSongs;

let audio = new Audio();

function playAudio () {
  audio.src = 'http://europa.shoutca.st:8648/;/;stream.mp3'
  audio.play()
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
    player.style.visibility= "hidden"
  }
  $.getJSON('https://europa.shoutca.st/rpc/atsueste/streaminfo.get', function (data) {
    content = `<img id="cover" src=${data.data[0]['track']['imageurl']} alt="album cover"><ul>
    <li class="artist">${data.data[0]['track']['artist']}</li>
    <li class="songTitle">${data.data[0]['track']['title']}</li>
    </ul>`
    songInfo.innerHTML = content
  })
  currentSection.style.visibility = "visible"
  player.style.visibility = "visible"
}

// Update song info every 4 seconds
setInterval(currentSongs, 4000)

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
