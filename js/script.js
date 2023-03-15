console.log("hi 👋");
let searchInput = document.querySelector("#searchInput");
let value = searchInput.value;
let slideshow = document.querySelector("#slideshow");
let redditSearchURL = "http://www.reddit.com/search.json?q=cats+nsfw:no";
let fetchOptions = {};
let fetchedURLs = [];

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(value);
  fetch(redditSearchURL, fetchOptions)
    .then((response) => response.json())
    .then((jsonData) => {
      fetchedURLs = [];
      console.log(jsonData.data.children);
      let imageBatchObjects = jsonData.data.children;
      console.log(imageBatchObjects[0].data.url);
      imageBatchObjects.forEach((object) => {
        if (object.data.url) {
          fetchedURLs.push(object.data.url);
        }
      });
      console.log(fetchedURLs);
      let slide = document.createElement("img");
      slide.src = fetchedURLs[0];
      console.log(slide);
      slideshow.append(slide);
      setInterval(switchImage, 1000);
    })
    .catch(console.warn);
});

const switchImage = () => {
  if (fetchedURLs.length > 0) {
    fetchedURLs.shift();
    document.querySelector("img").src = fetchedURLs[0];
    console.log(fetchedURLs[0]);
  }
};
