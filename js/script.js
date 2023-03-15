console.log("hi 👋");
let searchInput = document.querySelector("#searchInput");
let value = searchInput.value;
let redditSearchURL = "http://www.reddit.com/search.json?q=cats+nsfw:no";
let fetchOptions = {};

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(value);
  fetch(redditSearchURL, fetchOptions)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
    })
    .catch(console.warn);
});
