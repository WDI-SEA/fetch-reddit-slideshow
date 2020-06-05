/* ----------------- CONSTANTS AND VARIABLES ----------------- */

const INPUT_FORM = document.querySelector(`#input-form`);
const SUBMIT_BUTTON = document.querySelector(`#submit-button`);
const STOP_BUTTON = document.querySelector(`#stop-button`);
const IMG_CONTAINER = document.querySelector(`#img-container`);
const DISPLAY_IMG = document.querySelector(`#display-img`);
const USER_INPUT = document.querySelector(`#text-input`);

let imgLinks = [];  //img urls                                         
let currentImg = 0; //pointer for img array
let timer = null;   //for setInterval
let imgTime = 5000; //setInterval time

let redditUrl = `https://www.reddit.com/search.json?q=kitten`;  //default url to kittens search

/* ----------------- DOM EVENT LISTENERS ----------------- */

INPUT_FORM.addEventListener(`submit`, function(e) { newSearch(e); });
SUBMIT_BUTTON.addEventListener(`click`, function() { newSearch(); });
DISPLAY_IMG.addEventListener(`click`, function() { openUrl(); });
STOP_BUTTON.addEventListener(`click`, function() { stop(); });
USER_INPUT.style.display = 'none';
SUBMIT_BUTTON.style.display = 'none';

/* ----------------- FUNCTIONS ----------------- */

//search form
function newSearch(e){
  e.preventDefault(); //don't refresh page
  clearInterval(timer); //stop slideshow
  redditUrl = `https://www.reddit.com/search.json?q=${USER_INPUT.value}`; //update url from search form
  USER_INPUT.style.display = 'none';      //hide search elements and show stop button
  SUBMIT_BUTTON.style.display = 'none';
  STOP_BUTTON.style.display = 'inline';
  fetchImgs(redditUrl); //call fetching function
  //console.log(`new search ${USER_INPUT.value} url = ${redditUrl}`); 
}

//opens img url on click
function openUrl(){
  window.open(imgLinks[currentImg]);
}

//stop button 
function stop(){
  clearInterval(timer); //stop the slideshow
  USER_INPUT.style.display = 'inline'; //hide self and show form
  SUBMIT_BUTTON.style.display = 'inline';
  STOP_BUTTON.style.display = 'none';
 }

//fetches img urls from reddit api
function fetchImgs(url){
  fetch(url) //fetch search url
  .then(function(responseData){
    return responseData.json(); //jsonify response
  })
  .then(function(jsonData){
    let children = jsonData.data.children;
    imgLinks = [];  //clear previous url links
    children.forEach(function(child){     //check for .jpg images and push to imageLinks
      if(child.data.url.slice(-4) === `.jpg`){ //negetive value for slice start wraps backwards on string
        imgLinks.push(child.data.url);
      }
    })
    currentImg = 0; //start at beginning of the image array
    updateImg();  //update image
    setTimer();   //set slideshow timer
  })
  .catch(function(error){
    console.log(`error ${error}`);
  })
}

//update the displayed img
function updateImg() {
  DISPLAY_IMG.src = imgLinks[currentImg];
}

//create new slideshow timer
function setTimer(){
  timer = setInterval(tick, imgTime);
}

//called by slideshow setInterva;
function tick(){
  currentImg++; //inc the current img pointer
  if (currentImg >= imgLinks.length){ //reset if out of bounds of array length
    currentImg = 0;
  }
  updateImg(); //update img on tick
}

fetchImgs(redditUrl); //initiate slideshow with kittens search on page load
