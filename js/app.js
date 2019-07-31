//global variables /constants
const INTERVAL_DELAY = 2000;
const API_URL = 'https://www.reddit.com/search.json?q=';
var currentImages = [];
var currentIndex = 0;
var interval;

document.getElementById('stop-button').addEventListener('click', function(e) {

  document.getElementById('results-container').style.visibility= 'hidden';
  //SHow results and stop button
    document.getElementById('search-div').style.visibility = 'visible';

    clearInterval(interval);

})


document.getElementById('search-form').addEventListener('submit', function(e) {
//prevent form submission
  e.preventDefault();

  //grab the search Query
  var query = document.getElementById('query').value;

  //search for that query on reddit
  if (query) {
    //perform search on reddit
    fetchReddit(query);

    //empty form
    document.getElementById('query').value
  }

  else{
  }
});

function fetchReddit(query) {
  console.log('called fetch reddit with query arg of', query);

  //Call the reddit API with an AJAX call using fetchReddit
  fetch(API_URL + query +'+nsfw:no')
  .then(function(response) {return response.json();})
  .then(function(jsonData){
    var posts = jsonData.data.children;
    console.log('POSTS', posts);

//pair down the object to just the fields I care about
    var imageObjects = posts.map(function(p) {
      return {
        title: p.data.title,
        url: p.data.url,
        subreddit: p.data.subreddit,
        post_hint: p.data.post_hint
      }
    });
    //filtering out all of the non image posts
    currentImages = imageObjects.filter(function(p) {
      return p.post_hint === 'image';
    });
    //deal with starting the Slideshow
    startSlideshow();
})
  .catch(function(err){
  })
}



function startSlideshow() {
  // Set the current index to zero
  currentIndex = 0;
  // Set up the first imageObjects
  changeImage();
  // Hide form
  document.getElementById('search-div').style.visibility= 'hidden';
  //SHow results and stop button
    document.getElementById('results-container').style.visibility = 'visible';

  //clear old intervals
  clearInterval(interval);

  // Set interval to switch images
  interval = setInterval(changeImage, INTERVAL_DELAY);
}

function changeImage() {
//increment
  currentIndex++

  //check the bounds of the array
  if (currentIndex >= currentImages.length) {
    currentIndex = 0;
  }

  //set up the image
  placeImage();
}

function placeImage() {
  //create an img
  var img = document.createElement('img');
  img.src = currentImages[currentIndex].url

  //create an h2 to hold title
  var h2 = document.createElement('h2');
  h2.textContent = currentImages[currentIndex].title;

  //empty result div of any previous images
  document.getElementById('results').innerHTML = ''
  //add the image to the result div
  document.getElementById('results').append(img);
  document.getElementById('results').append(h2);
}
