//console.log("testicles");
/* -------------- DOM REFS -------------------*/

let start = document.getElementById("start");
let stop = document.getElementById("stop");
let searchBar = document.getElementById("search")
let displayPics = document.getElementById("slidshowLocation");


/* ------------- GAME LOGIC VARIABLES --------------------- */

let results = [];
let url = "https://www.reddit.com/search.json?q=cats+nsfw:no";
let photoArr = [];
let titleArr = [];



/* ----------------- READ DEEZ EVENTS --------------------- */
//start, stop
// start.addEventListener("click", startSlideshow);
// stop.addEventListener("click", stopSlideshow);



/* ------------------------- Writting Dem Functions -------------------- */

//function that starts slide show
    // take search parameter, adjust the url to search for a specific topic
    // updating array of photos / single img src to new image
// function startSlideshow() {
//     console.log(searchBar.value)
// }



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
            Object.keys(results[i].data.thumbnail).forEach(function(result) {
                photoArr.push(results[i].data.thumbnail);
                //console.log(photoArr)
            })
            Object.keys(results[i].data.title).forEach(function(result) {
                titleArr.push(results[i].data.title)
                //console.log(titleArr);
            })
  }
})
.catch(errorCatcher);
};
getSlideshow()

