document.addEventListener("DOMContentLoaded", function() {

//console.log("testicles");
/* -------------- DOM REFS -------------------*/

let stop = document.getElementById("stop");
let search = document.getElementById("searchButton");
// let displayPics = document.getElementById("slidshowLocation");


/* ------------- GAME LOGIC VARIABLES --------------------- */

let results = [];
let url = "https://www.reddit.com/search.json?q=cats+nsfw:no";
let photoArr = [];
let titleArr = [];


/* ----------------- READ DEEZ EVENTS --------------------- */
search.addEventListener("click", createSlideshow);




/* ------------------------- Writting Dem Functions -------------------- */
// lets make the rotating slideshow function

function createSlideshow(e) {
    e.preventDefault()
    let searchResult = document.getElementById("searchBar").value
    url = `https://www.reddit.com/search.json?q=${searchResult}+nsfw:no`
    getSlideshow()
    console.log(url)
};






/* -------------- get images from Reddit via JSON --------------------- */

function getSlideshow() {
function errorCatcher(error) {
    console.log(error)
};

fetch(url) 
.then(function(responseData) {
    return responseData.json();
})
.then(function(jsonData) {
    //console.log(jsonData.data.children);
    results = jsonData.data.children;
        for (let i = 0; i < results.length; i++) {
                photoArr.push(results[i].data.thumbnail);
                //console.log(photoArr)
                titleArr.push(results[i].data.title)
                console.log(titleArr);
  }
})
.catch(errorCatcher);
};
//getSlideshow()
});
