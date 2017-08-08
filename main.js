/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
var input = document.querySelector("input");
var button = document.querySelector("button");
var results = document.getElementById("results");
var itunesReturn = {};

button.addEventListener("click", function search() {

  results.innerHTML = "";
  var searchTerm = input.value;
  fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=music`).then(function(response) {
    response.json().then(function(data) {
        itunesReturn = data.results;
        return itunesReturn;
      })

      .then(function() {
        for (var i = 0; i < itunesReturn.length; i++) {
          results.innerHTML += `
              <div class="resultBubble">
                <button id="${itunesReturn[i].trackName}" class="track">
                  <div class="topImage">
                    <img src=${itunesReturn[i].artworkUrl100} alt=${itunesReturn[i].artistName}>
                  </div>
                  <div class="bottomResult">
                    <p class="title">${itunesReturn[i].trackName}</p>
                    <p class="artist">${itunesReturn[i].artistName}</p>
                  </div>
                </button>
              </div>`
        }
      })

      .then(function() {
        var tracks = document.querySelectorAll(".track");
        tracks.forEach(function(track, i) {
          track.addEventListener("click", function() {
            player.innerHTML = `
              <p>${itunesReturn[i].trackName} - ${itunesReturn[i].artistName}</p>
              <audio src="${itunesReturn[i].previewUrl}" controls="controls" class="itunesplayer"></audio>
                                 `
          })
        })
      })
  })
})
