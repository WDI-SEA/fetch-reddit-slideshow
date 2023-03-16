console.log("hi 👋");
let searchInput = document.querySelector("#searchInput");
let searchForm = document.querySelector("#searchForm");
let slideshow = document.querySelector("#slideshow");
let formButton = document.querySelector("#formButton");
let fetchedURLs = [];
let filteredURLs = [];

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formButton.disabled = true;
  let searchURL = `https://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`;
  fetch(searchURL, {})
    .then((response) => response.json())
    .then((jsonData) => {
      startSlideshow(jsonData);
      searchForm.style.display = "none";
    })
    .catch(console.warn);
});

const startSlideshow = (jsonData) => {
  fetchedURLs = [];
  let imageBatchObjects = jsonData.data.children;
  imageBatchObjects.forEach((object) => {
    console.log(object.data.url);
    fetchedURLs.push(object.data.url);
    filteredURLs = fetchedURLs.filter((URL) => {
      return URL.endsWith("jpg") || URL.endsWith("png");
    });
  });
  let slide = document.createElement("img");
  slide.src = filteredURLs[0];
  slideshow.append(slide);
  setInterval(switchImage, 2000);
};

const switchImage = () => {
  if (filteredURLs.length > 1) {
    filteredURLs.shift();
    document.querySelector("img").src = filteredURLs[0];
  }
};
