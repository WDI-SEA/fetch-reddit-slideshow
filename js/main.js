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
// slide.addEventListener("load", postSlides)



/* ------------------------- Writting Dem Functions -------------------- */

// takes user input and changes search parameters for slide show
function createSlideshow(e) {
    e.preventDefault()
    let searchResult = document.getElementById("searchBar").value
    url = `https://www.reddit.com/search.json?q=${searchResult}+nsfw:no`
    slideshow()
    //postSlides()
    //console.log(url)
};

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
                //console.log(results[0].data.url);
                //console.log(photoArr[0])
            }
                // titleArr.push(results[i].data.title)
                // console.log(titleArr);
  }
  function postSlides() {
      for (let i = 0; i < photoArr.length; i++){
        slides.src = photoArr[i];
        console.log(slides.src)
        //photoArr[i]++
        //console.log(photoArr[i])
        //console.log(photoArr.indexOf("https://i.redd.it/u53ct56yknz41.jpg"))
      }
}
setInterval(postSlides, 10000)
})
.catch(errorCatcher);
};

});




/*------------------------ dont fuck with this for now --------------------*/
// fetch(url) 
// .then(function(responseData) {
//     return responseData.json();
// })
// .then(function(jsonData) {
//     // console.log(jsonData.data.children);
//     results = jsonData.data.children;
//         for (let i = 0; i < results.length; i++) {
//             if (results[i].data.url.endsWith("jpg")) {
//                 photoArr.push(results[i].data.url);
//                 //console.log(photoArr)
//                 //console.log(photoArr.indexOf("https://i.redd.it/u53ct56yknz41.jpg"))
//             }
//                 // titleArr.push(results[i].data.title)
//                 // console.log(titleArr);
//   }
//   function postSlides() {
//       for (let i = 0; i < photoArr.length; i++){
//         slides.src = photoArr[i];
//         photoArr[i]++
//         //console.log(photoArr[i])
//         //console.log(photoArr.indexOf("https://i.redd.it/u53ct56yknz41.jpg"))
//       }
// }
// setInterval(postSlides, 2000)
// })
// .catch(errorCatcher);
// };

// });