console.log("js loaded!");

//let searchString = document.getElementById("img-search").value;
let searchString = "cat";
let searchBtn = document.getElementById("search-btn");
let imgDiv = document.getElementById("img-div");
let url = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`;
let imgArr = [];

// ---------- EVENT LISTENERS ----------
searchBtn.addEventListener("click", searchImg);

function searchImg() {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.data.children); // .children.data.preview
      let imgArr = data.data.children;
      let imgPath = imgArr[0].data.preview.images[0].source.url;

      imgDiv.innerHTML = "";
      imgDiv.innerHTML = `<img src="${imgPath}">`;
      //   imgArr.forEach(function (img) {
      //     console.log(img);
      //   });
    });
}
