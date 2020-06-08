console.log("js loaded!");

//let searchString = document.getElementById("img-search").value;
let searchString = "cat";
let searchBtn = document.getElementById("search-btn");
let imgDiv = document.getElementById("img-div");
let url = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`;
let imgArr = [];
let currentIndex = 0;
let interval = null;

// ---------- EVENT LISTENERS ----------
searchBtn.addEventListener("click", searchImg);

function searchImg() {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let imgsArr = data.data.children;
      let imgSrcArray = imgsArr
        .filter(function (img) {
          if (img.data.preview == undefined) {
            return false; //skip
          } else {
            return true;
          }
        })
        .map(function (img) {
          return img.data.preview.images[0].source.url;
        });
      console.log(imgSrcArray);

      for (let i = 0; i < imgSrcArray.length; i++) {
        setInterval(function () {
          console.log(imgSrcArray[i]);
          imgDiv.innerHTML = "";
          imgDiv.innerHTML = `<img src="${imgSrcArray[i]}">`;
        }, 5000);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
