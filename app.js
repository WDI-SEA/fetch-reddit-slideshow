const searchTermBox = document.getElementById("search-term");
const button = document.getElementById("search-button");
const mainScreen = document.getElementsByClassName("main");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const image = document.querySelector("img");
let imgArray = [];
let imgNum = 0;
let interval;

const fetchImages = () => {
  let search = searchTermBox.value;
  image.classList.remove("hidden");
  const endpoint = `http://www.reddit.com/search.json?q=${search.replace(
    / /g,
    "_"
  )}+nsfw:no&limit=50&sort=top`;
  // fetch requires the api url as an argument
  fetch(endpoint)
    .then((fetchObj) => fetchObj.json())
    .then((jsonData) => {
      createImageArray(jsonData);
      interval = setInterval(cycleImages, 1000);
    })
    .catch((err) => console.log("There was an error fetching data", err));
  for (let i = 0; i < mainScreen.length; i++) {
    mainScreen[i].classList.add("hidden");
  }
  stopButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
};

function checkImage(text) {
  return (text.indexOf(".jpg") || text.indexOf(".png")) === text.length - 4;
}

function createImageArray(apiResults) {
  let urlArray = [];
  for (let i = 0; i < apiResults.data.children.length; i++) {
    let apiUrlString = apiResults.data.children[i].data.url;
    urlArray[i] = apiUrlString;
  }
  imgArray = urlArray.filter((element) => checkImage(element));
}

function cycleImages() {
  image.src = imgArray[imgNum];
  if (imgNum < imgArray.length - 1) {
    imgNum++;
  } else {
    imgNum = 0;
  }
}

function pause() {
  clearInterval(interval);
  pauseButton.classList.add("hidden");
  resumeButton.classList.remove("hidden");
  previousButton.classList.remove("hidden");
  nextButton.classList.remove("hidden");
}

function resume() {
  pauseButton.classList.toggle("hidden");
  resumeButton.classList.toggle("hidden");
  imgNum++;
  interval = setInterval(cycleImages, 2000);
}

function prevImage() {
  if (imgNum > 0) {
    imgNum--;
  } else {
    imgNum = imgArray.length - 1;
  }
  image.src = imgArray[imgNum];
}

function nextImage() {
  if (imgNum < imgArray.length) {
    imgNum++;
  } else {
    imgNum = 0;
  }
  image.src = imgArray[imgNum];
}

function backToMainScreen() {
  image.src = "";
  clearInterval(interval);
  for (let i = 0; i < mainScreen.length; i++) {
    mainScreen[i].classList.remove("hidden");
  }
  searchTermBox.value = "";
  image.classList.toggle("hidden");
  stopButton.classList.add("hidden");
  previousButton.classList.add("hidden");
  nextButton.classList.add("hidden");
  resumeButton.classList.add("hidden");
  imgNum = 0;
  imgArray = [];
  urlArray = [];
}

button.addEventListener("click", fetchImages);
stopButton.addEventListener("click", backToMainScreen);
pauseButton.addEventListener("click", pause);
resumeButton.addEventListener("click", resume);
previousButton.addEventListener("click", prevImage);
nextButton.addEventListener("click", nextImage);
