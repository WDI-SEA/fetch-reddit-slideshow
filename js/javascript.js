arr = [];
var searchString = 'cats';
slideDiv = document.getElementById("imgs");
slideDivImg = document.getElementById("imgs").childNodes;
submitBtn = document.getElementById("submit-query");
input = document.getElementById("inputQuery");

submitBtn.onclick = function() {
    searchString = input.value; 
    getIt(searchString);
    addClass();
}

function getIt(search) {
    fetch(`https://www.reddit.com/search.json?q=${search}+url:.jpg+nsfw:no`) 
    .then(function(responseData) {
        return responseData.json();
    })
    .then(function(jsonData) {
        for(i = 0; i < 25; i++) {
            arr.push(jsonData.data.children[i].data.url);
            // console.log(jsonData.data.children[i].data.url)
            createSlideDivs(i)
        }
    }); 
}

function createSlideDivs(i) {
    var newDivItem = document.createElement("div");
    newDivItem.setAttribute("class", "carousel-item");
    newDivItem.setAttribute("id", i);
    slideDiv.appendChild(newDivItem);
    createSlideImgs(i)
}

function createSlideImgs(i) {
    var newImgItem = document.createElement("img");
    newImgItem.setAttribute("class", "d-block w-100");
    newImgItem.setAttribute("alt", "slide-"+i);
    newImgItem.setAttribute("src", arr[i]);
    document.getElementById(i).appendChild(newImgItem);
    document.getElementById("0").classList.add("active");
}

// setInterval(function(){
    
// },10000)