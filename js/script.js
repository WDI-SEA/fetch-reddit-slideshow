const submitButton = document.querySelector("#submitButton");
const searchInput = document.querySelector("#searchInput");
const stopButton = document.querySelector("#stopButton");
const displayResults = document.querySelector("#resultsContainer");

// fetch when submit is pressed

function fetchReddit(e) {
  e.preventDefault();
  const endpoint = "http://www.reddit.com/search.json?q=cats+nsfw:no";
  fetch(endpoint)
    .then((fetchObj) => fetchObj.json())
    .then((jsonData) => {
      console.log("Here is the data:", jsonData);
      addImg(jsonData)
    })
    .catch((err) => console.log("There was an error fetching data:", err));
}

submitButton.addEventListener("click", fetchReddit);

let addImg = (redditImgs) => {
  for (let i = 0; i < redditImgs.data.children.length; i++) {
    let newImg = document.createElement("img");
    newImg.src = redditImgs.data.children[i].data.url
    displayResults.appendChild(newImg);
    console.log(redditImgs)
    console.log(newImg.src)
  }
}
 

