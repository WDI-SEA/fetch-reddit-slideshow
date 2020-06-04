const IMG_CONTAINER = document.querySelector(`#img-container`);
const INPUT_FORM = document.querySelector(`#input-form`).addEventListener(`submit`, function(e) { newSearch(e); });
const SUBMIT_BUTTON = document.querySelector(`#submit-button`).addEventListener(`click`, function(e) { newSearch(e); });
const STOP_BUTTON = document.querySelector(`#stop-button`).addEventListener(`click`, function(e) { stop(e); });
const DISPLAY_IMG = document.querySelector(`#display-img`);
const USER_INPUT_CONTAINER = document.querySelector(`#user-input-container`);
const USER_INPUT = document.querySelector(`#text-input`);
const STOP_CONTAINER = document.querySelector(`#stop-container`);

let imgLinks = [];
let currentImg = 0;

let timer = null;
let imgTime = 5000;

let redditUrl = `https://www.reddit.com/search.json?q=kitten`;

function newSearch(e){
  e.preventDefault();
  USER_INPUT_CONTAINER.style.display = "none";
  STOP_CONTAINER.style.display = "display";
  clearTimeout(timer);
  redditUrl = `https://www.reddit.com/search.json?q=${USER_INPUT.value}`;
  console.log(`new search ${USER_INPUT.value} url = ${redditUrl}`);

  fetchImgs(redditUrl);

}

function stop(e){
  //e.preventDefault();
  USER_INPUT_CONTAINER.style.display = "display";
  //STOP_CONTAINER.style.display = "none";
}

function fetchImgs(url){
  fetch(url)
  .then(function(responseData){
    return responseData.json();
  })
  .then(function(jsonData){
    let children = jsonData.data.children;
    //clear links
    imgLinks = [];
    //check for .jpg images and push to imageLinks
    children.forEach(function(child){
      if(child.data.url.slice(-4) === `.jpg`){
        imgLinks.push(child.data.url);
      }
    })
    console.log(imgLinks);
    updateImg();
    setTimer();
  })
  .catch(function(error){
    console.log(`error ${error}`);
  })
}

function updateImg() {
  console.log(imgLinks[currentImg]);
  DISPLAY_IMG.src = imgLinks[currentImg];
}

function setTimer(){
  timer = setInterval(tick, imgTime);
}

function tick(){
  currentImg++;
  if (currentImg >= imgLinks.length){
    currentImg = 0;
  }
  updateImg();
}

fetchImgs(redditUrl);

//STOP_CONTAINER.style.display = "none";