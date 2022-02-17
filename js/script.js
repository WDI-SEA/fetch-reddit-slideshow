const submitButton = document.querySelector("#submitButton");
const stopButton = document.querySelector("#stopButton");
const displayResults = document.querySelector("#resultsContainer");
const title = document.querySelector(".title");
const instructions = document.querySelector(".instructions");
const searchForm = document.getElementById("searchForm");

let arrImages = [];
let imgIndex = 0;

// fetch when submit is pressed
function fetchReddit() {
  const searchInput = document.getElementById("searchInput").value;
  const endpoint = `http://www.reddit.com/search.json?q=${searchInput}+nsfw:no`;
  fetch(endpoint)
    .then((fetchObj) => fetchObj.json())
    .then((jsonData) => {
      // console.log("Here is the data:", jsonData);
      addImg(jsonData);
      instructions.classList.add("hide");
      title.classList.add("hide");
      searchForm.classList.add("hide");
      stopButton.classList.remove('hide')
    })
    .catch((err) => console.log("There was an error fetching data:", err));
}

let addImg = (redditImgs) => {
  while (displayResults.firstChild) {
    displayResults.firstChild.remove();
  }
  let imagesArray = redditImgs.data.children;
  arrImages = imagesArray.filter((element) => {
    if (element.data.post_hint === "image") {
      return true;
    } else {
      return false;
    }
  });

  let newImage = document.createElement("img");
  newImage.src = arrImages[0].data.url;
  displayResults.appendChild(newImage);
  timer = setInterval(switchImage, 2000);
};

let switchImage = () => {
  currentImage = document.querySelector("img");
  if (imgIndex < arrImages.length - 1) {
    imgIndex++;
  } else imgIndex = 0;
  currentImage.src = arrImages[imgIndex].data.url;
};

let restart = () => {
  instructions.classList.remove("hide");
  title.classList.remove("hide");
  searchForm.classList.remove("hide");
  stopButton.classList.add('hide')
  document.getElementById("searchInput").value = "";
  document.querySelector("img").classList.add("hide");
  clearInterval(timer);
};

document.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchReddit();
});

stopButton.addEventListener("click", restart);
