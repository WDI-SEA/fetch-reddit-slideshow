const searchTermBox = document.getElementById("search-term");
const button = document.getElementById("search-button");
const mainScreen = document.getElementsByClassName("main");
const stopButton = document.getElementById("stop-button");
const image = document.querySelector("img");
let imgArray = [];
let imgNum = 0;
let interval;

const fetchImages = () => {
  image.classList.remove("hidden");
  const endpoint = `http://www.reddit.com/search.json?q=${searchTermBox.value.replace(
    / /g,
    "_"
  )}&limit=50&sort=top&nsfw:no`;
  // fetch requires the api url as an argument
  fetch(endpoint)
    .then((fetchObj) => fetchObj.json())
    .then((jsonData) => {
      createImageArray(jsonData);
      interval = setInterval(cycleImages, 2000);
    })
    .catch((err) => console.log("There was an error fetching data", err));
  for (let i = 0; i < mainScreen.length; i++) {
    mainScreen[i].classList.add("hidden");
  }
  stopButton.classList.toggle("hidden");
};

function checkImage(text) {
  return text.indexOf(".jpg") === text.length - 4;
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
  if (imgNum < imgArray.length) {
    imgNum++;
  } else {
    imgNum = 0;
  }
}

function backToMainScreen() {
  image.src = "";
  clearInterval(interval);
  for (let i = 0; i < mainScreen.length; i++) {
    mainScreen[i].classList.remove("hidden");
  }
  searchTermBox.value = "";
  image.classList.toggle("hidden");
  stopButton.classList.toggle("hidden");
  imgNum = 0;
  imgArray = [];
  urlArray = [];
}

button.addEventListener("click", fetchImages);
stopButton.addEventListener("click", backToMainScreen);
