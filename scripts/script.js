'use strict';

var player = document.querySelector('.player');
var currentSection = document.querySelector('.currentSection');
var recentSongs = document.querySelector('#recentSongs');
player.addEventListener('click', toggleAudio);

var interval = 4000;

window.onload = currentSongs;

var audio = new Audio();

function playAudio() {
  audio.src = 'http://europa.shoutca.st:8648/;';
  audio.load();
  setTimeout(function () {
    audio.play();
  }, 0);
}

function stopAudio() {
  audio.pause();
  audio.src = '';
  audio = new Audio();
}

function currentSongs() {
  var songInfo = document.querySelector('#currentSong');
  var content = void 0;
  if (typeof content === 'undefined') {
    currentSection.style.visibility = "hidden";
    player.style.visibility = "hidden";
  }
  $.getJSON('https://europa.shoutca.st/rpc/atsueste/streaminfo.get', function (data) {
    content = '<img class="albumCover" src=' + data.data[0]['track']['imageurl'] + ' alt="album cover"><ul>\n    <li class="artist">' + data.data[0]['track']['artist'] + '</li>\n    <li class="songTitle">' + data.data[0]['track']['title'] + '</li>\n    </ul>';
    songInfo.innerHTML = content;
  });
  currentSection.style.visibility = "visible";
  player.style.visibility = "visible";
}

function toggleAudio() {
  if (player.getAttribute('src') === "images/Groove_Play_128.png") {
    playAudio();
    player.src = "images/Groove_Stop_128.png";
  } else if (player.getAttribute('src') === "images/Groove_Stop_128.png") {
    stopAudio();
    player.src = "images/Groove_Play_128.png";
  }
}

function displayLastSongs() {
  var content = void 0;
  var loader = document.querySelector('.loading');
  $.getJSON('https://europa.shoutca.st/recentfeed/atsueste/json/', function (data) {
    content = '<ul id =\'airedList\'>';


        // Polyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#Polyfill
        var obj = data.items;
        if (!Object.entries) {
      Object.entries = function( obj ){
        var ownProps = Object.keys( obj ),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
          resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
      };
    }

    var lastFive = Object.entries(data.items).slice(1, 6);
    for (var i = 0; i < lastFive.length; i++) {
      content += '<li>\n      <img class=\'albumCover\' src="' + lastFive[i][1]['enclosure']['url'] + '" alt="' + lastFive[i][1]['description'] + '">\n      ' + lastFive[i][1]['title'] + '</li>';
    }
    content += '</ul>';
    recentSongs.innerHTML = content;
  });
};

// // Update song info every 4 seconds
// setInterval(currentSongs, interval)
var switchInterval = void 0;
function intervalHandler() {
  switchInterval = setInterval(function () {
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
