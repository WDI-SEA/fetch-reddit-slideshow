document.addEventListener("DOMContentLoaded", function() {

/* -------------- DOM REFS -------------------*/

let stop = document.getElementById("stop");
let search = document.getElementById("searchButton");
let slides = document.getElementById("slideshowLocation");
let explination = document.querySelector(".explination");
let label = document.querySelector(".label")
let searchBar = document.getElementById("searchBar");
 
/* ------------- GAME LOGIC VARIABLES --------------------- */

let results = [];
let url = "https://www.reddit.com/search.json?q=cats+nsfw:no";
let photoArr = [];

/* ----------------- READ DEEZ EVENTS --------------------- */

search.addEventListener("click", createSlideshow);
stop.addEventListener("click", reset);

/* ------------------------- Writting Dem Functions -------------------- */

// takes user input and changes search parameters for slide show
function createSlideshow(e) {
    e.preventDefault();
    let searchResult = document.getElementById("searchBar").value;
    url = `https://www.reddit.com/search.json?q=${searchResult}+nsfw:no`;
    slideshow();
    explination.innerText = " ";
    label.innerText = " ";
    search.disabled = true;
    searchBar.disabled = true;
    stop.disabled = false;
};

function reset(e) {
    e.preventDefault();
    photoArr = [];
    titleArr = [];
    slides.src = "https://qph.fs.quoracdn.net/main-qimg-7d2f5552ca8fdefdd548c26eba761f78.webp";
    url = "https://www.reddit.com/search.json?q=cats+nsfw:no";
    explination.innerText = "Enter your search below and let the slideshow begin";
    label.innerText = "Search Reddit:"
    search.disabled = false;
    searchBar.disabled = false;
    stop.disabled = true;
    clearInterval(interval);
}


/* -------------- get images from Reddit via JSON --------------------- */

function slideshow() {
function errorCatcher(error) {
    console.log(error)
};

fetch(url) 
.then(function(responseData) {
    return responseData.json();
})
.then(function(jsonData) {
    //console.log(jsonData.data.children.0.url);
    results = jsonData.data.children;
        for (let i = 0; i < results.length; i++) {
            if (results[i].data.url.endsWith("jpg")) {
                photoArr.push(results[i].data.url);
                //slides.src++
                //console.log(results[0].data.url);
                //console.log(results[1])
            }
    }
  function postSlides() {
        slides.src = photoArr.shift();
        slides.src[0]++
        //photoArr.fill(results)
        //console.log(photoArr)
        //console.log(slides.src[0])
}
interval = setInterval(postSlides, 3000);
})
.catch(errorCatcher);
};

});

/*------------------------ test zone --------------------*/

// function slideshow() {
//     function errorCatcher(error) {
//         console.log(error)
//     };
    
//     fetch(url) 
//     .then(function(responseData) {
//         return responseData.json();
//     })
//     .then(function(jsonData) {
//         //console.log(jsonData.data.children.0.url);
//         results = jsonData.data.children;
//             for (let i = 0; i < results.length; i++) {
//                 if (results[i].data.url.endsWith("jpg")) {
//                     photoArr.push(results[i].data.url);
//                     //slides.src++
//                     //console.log(results[0].data.url);
//                     //console.log(results[1])
//                 }
//         }
//       function postSlides() {
//             slides.src = photoArr.map();
//             slides.src[0]++
//             //photoArr.fill(results)
//             //console.log(photoArr)
//             //console.log(slides.src[0])
//     }
//     interval = setInterval(postSlides, 3000)
//     })
//     .catch(errorCatcher);
//     };

//     });