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
        fetchedURLs.push(object.data.url);
      });
      console.log(fetchedURLs);
      let slide = document.createElement("img")
      slide.src = fetchedURLs[0];
      console.log(slide)
      slideshow.append(slide);
    })
    .catch(console.warn);
});
