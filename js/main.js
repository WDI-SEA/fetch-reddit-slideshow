document.addEventListener("DOMContentLoaded", function() {

//console.log("testicles");
/* -------------- DOM REFS -------------------*/

let stop = document.getElementById("stop");
let search = document.getElementById("searchButton");
let slides = document.getElementById("slideshowLocation");

/* ------------- GAME LOGIC VARIABLES --------------------- */

let results = [];
let url = "https://www.reddit.com/search.json?q=cats+nsfw:no";
let photoArr = [];
let titleArr = [];


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
    stop.disabled = false;
    //postSlides()
    //console.log(url)
};

function reset(e) {
    e.preventDefault();
    photoArr = [];
    titleArr = [];
    slides.src = "https://www.placecage.com/c/400/400";
    url = "https://www.reddit.com/search.json?q=cats+nsfw:no";
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
                // titleArr.push(results[i].data.title)
                // console.log(titleArr);
    }
  function postSlides() {
        slides.src = photoArr.shift();
        slides.src[0]++
        //photoArr.fill(results)
        //console.log(photoArr)
        //console.log(slides.src[0])
}
interval = setInterval(postSlides, 3000)
})
.catch(errorCatcher);
};

});




/*------------------------ dont fuck with this for now Safety Net --------------------*/

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
//                     //console.log(photoArr[0])
//                 }
//                     // titleArr.push(results[i].data.title)
//                     // console.log(titleArr);
//         }
//       function postSlides() {
//             slides.src = photoArr.shift();
//             slides.src[0]++
//             // photoArr.fill(results[i].data.url)
//             console.log(photoArr)
//             console.log(slides.src[0])
//     }
//     setInterval(postSlides, 3000)
//     })
//     .catch(errorCatcher);
//     };
    
//     });