// fetch with the input

// use filter and map to only get images (array)
// make sure to just show the images

// cycle through images with setInterval

//.src and create new URL if possible

// DOM Selectors
const form = document.querySelector("form");
const input = document.querySelector("input");
const loadingMessage = document.querySelector("#loading-message");
const imgSlide = document.querySelector("#imageSlide");
const stopButton = document.querySelector("#stop-button");

// Reddit API URL
const redditURL = "http://www.reddit.com/search.json";

// Array to keep images
let imageUrls = [];

// submit form event listener - this should load pieces (loading message and clear input)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value;
  input.value = "";
  fetch(`${redditURL}?q=${inputValue}+nsfw:no`)
    .then((response) => response.json())
    .then(data => {
        // console.log(data.data.children[].data.url)
        for(let i=0; i < data.data.children.length; i++) {
            imageUrls.push(data.data.children[i].data.url)
        }
        const result = imageUrls.filter(image => image.endsWith('.jpg') || image.endsWith('.png'))
    //   form.style.display = "none";
    //   loadingMessage.style.display = "none"
    // const img = document.createElement("img")
    // img.src = result[0]
    // start slideshow
    function startSlideShow() {
        let i = 0;
        setInterval(() => {
          imgSlide.src = result[i];
          i++;
          if (i === result.length) {
            i = 0;
          }
        }, 2000);
      }
    startSlideShow(result)
        // slideShow.append(img)
    })
    .catch(console.warn)
})

// function for slideshow


// function startSlideShow() {
//     let currentIndex = 0
//     imgSlide.src = imageUrls[currentIndex]
//     const intervalId = setInterval(() => {
//         currentIndex++
//         if (currentIndex === imageUrls.length) {
//             currentIndex = 0
//         }
//         imgSlide.src = imageUrls[currentIndex];
//     }, 2000)
//     }

// stop button - stop interval
