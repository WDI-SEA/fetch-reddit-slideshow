const submitButton = document.querySelector("#submitButton");
const searchInput = document.querySelector("#searchInput");
const stopButton = document.querySelector("#stopButton");
const displayResults = document.querySelector("#resultsContainer");

let arrImages = [];

// fetch when submit is pressed

function fetchReddit(e) {
  e.preventDefault();
  const endpoint = `http://www.reddit.com/search.json?q=${searchInput}'+nsfw:no`;
  fetch(endpoint)
    .then((fetchObj) => fetchObj.json())
    .then((jsonData) => {
      console.log("Here is the data:", jsonData);
      addImg(jsonData);
    })
    .catch((err) => console.log("There was an error fetching data:", err));
}

submitButton.addEventListener("click", fetchReddit);

let addImg = (redditImgs) => {
  while (displayResults.firstChild) {
    displayResults.firstChild.remove()
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
  setInterval(switchImage, 2000)
};

let switchImage = () => {
  currentImage = document.querySelector('img')
  currentImage.src = arrImages[i].data.url
  i++
}