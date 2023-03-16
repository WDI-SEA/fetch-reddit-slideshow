console.log("hi 👋");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const slideshow = document.querySelector("#slideshow");
const formButton = document.querySelector("#formButton");
const stopButton = document.querySelector("#stopButton");
let fetchedURLs = [];
let filteredURLs = [];
let slidesInterval;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formButton.disabled = true;

  let searchURL = `https://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`;
  fetch(searchURL, {})
    .then((response) => response.json())
    .then((jsonData) => {
      startSlideshow(jsonData);
      searchForm.style.display = "none";
      searchInput.value = "";
    })
    .catch(console.warn);
});

const startSlideshow = (jsonData) => {
  fetchedURLs = [];
  let imageBatchObjects = jsonData.data.children;
  imageBatchObjects.forEach((object) => {
    fetchedURLs.push(object.data.url);
    filteredURLs = fetchedURLs.filter((URL) => {
      return URL.endsWith("jpg") || URL.endsWith("png");
    });
  });
  let slide = document.createElement("img");
  slide.src = filteredURLs[0];
  slideshow.append(slide);
  slidesInterval = setInterval(switchImage, 2000);
  stopButton.style.display = "block";
};

const switchImage = () => {
  if (filteredURLs.length > 1) {
    filteredURLs.shift();
    document.querySelector("img").src = filteredURLs[0];
  }
};

stopButton.addEventListener("click", () => {
  clearInterval(slidesInterval);
  document.querySelector("img").remove();
  formButton.disabled = false;
  searchForm.style.display = "flex";
  stopButton.style.display = "none";
});
