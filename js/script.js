console.log("hi 👋");
let searchInput = document.querySelector("#searchInput");
let value = searchInput.value;
let slideshow = document.querySelector("#slideshow");
let redditSearchURL = "http://www.reddit.com/search.json?q=cats+nsfw:no";
let fetchOptions = {};
let fetchedURLs = [];

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(redditSearchURL, fetchOptions)
    .then((response) => response.json())
    .then((jsonData) => {
      fetchedURLs = [];
      let imageBatchObjects = jsonData.data.children;
      imageBatchObjects.forEach((object) => {
        if (object.data.url) {
          fetchedURLs.push(object.data.url);
        }
      });
      let slide = document.createElement("img");
      slide.src = fetchedURLs[0];
      slideshow.append(slide);
      setInterval(switchImage, 1000);
    })
    .catch(console.warn);
});

const switchImage = () => {
  if (fetchedURLs.length > 0) {
    fetchedURLs.shift();
    document.querySelector("img").src = fetchedURLs[0];
  }
};
