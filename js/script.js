//dom elements
let callImg = document.getElementById("call-img");
let imgSubject;
let hide = document.querySelectorAll(".hide");
let stopbtn = document.getElementById("stopbtn");
let imgs = document.getElementsByTagName("img");

//show hidden button
let toggleHideAway = () => {
  for (let i = 0; i < hide.length; i++) {
    if (hide[i].style.display === "none") {
      hide[i].style.display = "block";
    } else {
      hide[i].style.display = "none";
    }
  }
};

// let imgText = document.getElementById("img-text").value
//functions

//pragmatic programmer
//assembly language
//array linklist

//rocking algorithms

function fetchImg(sub) {
  console.log(sub);

  const endpoint = `http://www.reddit.com/search.json?q=${sub}+nsfw:no&limit=30;`;

  fetch(endpoint)
    .then((fetchObj) => fetchObj.json()) //wrapper to get to json data
    .then((jsonData) => {
      //to objects
      let results = jsonData.data.children;
      let imgIdx = 0;
      const interval = 2500;
      //make a list of all urls
      let urls = results.map((result) => {
        return result.data.url;
      });
      //check which are images
      let imgUrls = urls.filter(function (url) {
        console.log(url);
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
      });
      console.log(imgUrls);

      //function to post imgs
      function carouselImgs() {
        let slideshow = document.getElementById("slideshow");
        let displayImg = document.createElement("img");
        while (slideshow.firstChild) {
          slideshow.firstChild.remove();
        }
        displayImg.src = imgUrls[imgIdx];
        slideshow.appendChild(displayImg);
        //makes it loop
        imgIdx = (imgIdx + 1) % imgUrls.length;
        // if (onerror){
      }
      let imgInterval = setInterval(carouselImgs, interval);
      console.log(hide.length);
      stopbtn.style.visibility = "visible";

      stopbtn.addEventListener("click", (e) => {
        stopbtn.style.visibility = "hidden";

        // for (let i= imgs.length; i >= 0; i--){
        //   imgs[i].parentNode.removeChild(imgs[i])
        // }
        console.log(slideshow.firstChild);
        if (slideshow.firstChild) {
          slideshow.firstChild.remove();
          console.log("seeya");
        } else {
          console.log("wtfmate");
          clearInterval(imgInterval);
          toggleHideAway();
        }

        clearInterval(imgInterval);
        toggleHideAway();
      });
    })
    .catch((err) => console.log("error fetching data:", err));
}

// while (slideshow.firstChild){
//       slideshow.firstChild.remove()
//     }
// form
// title
// description

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  imgSubject = document.getElementById("text").value;
  fetchImg(imgSubject);
  toggleHideAway();
});

// let carouselImgs = (urls) => {
//   let displayImg = document.createElement('img')

// if (imgIdx === urls.length - 1){
//   imgIdx = 0
// }
//get first image
//post on carausel
//   displayImg.src = urls[imgIdx]
//   slideshow.appendChild(displayImg)
//   // imgIdx++
//   imgIdx = (imgIdx + 1) % urls.length;
// }

// eventlisteners
// document.addEventListener('DOMContentLoaded', ()=> {

//   console.log('redditcats')

// })
