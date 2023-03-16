// // Get references to the necessary elements
// const searchForm = document.getElementById('search-form');
// const searchTermInput = document.getElementById('search-term');
// const loadingMessage = document.getElementById('loading-message');
// const slideshowContainer = document.getElementById('slideshow-container');
// const stopBtn = document.getElementById('stop-btn');

// // Variables to hold the slideshow interval ID and the image index
// let slideshowInterval;
// let currentImageIndex;

// // Function to fetch related posts from Reddit
// async function fetchRelatedPosts(searchTerm) {
//     const response = await fetch(`http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`);
//     const data = await response.json();
//     const posts = data.data.children.map(post => post.data);
//     const imageUrls = posts.filter(post => post.post_hint === 'image')
//                            .map(post => post.url);
//     return imageUrls;
//   }
//   console.log(fetchRelatedPosts)
  

// // Function to start the slideshow
// async function startSlideshow(searchTerm) {
//   // Fetch related posts from Reddit
//   const imageUrls = await fetchRelatedPosts(searchTerm);

//   // Hide the search form and show the loading message and slideshow container
//   searchForm.style.display = 'none';
//   loadingMessage.style.display = 'block';
//   slideshowContainer.style.display = 'block';

//   // Initialize the current image index to 0
//   currentImageIndex = 0;

//   // Function to display the next image in the slideshow
//   function showNextImage() {
//     // Create a new image element and set its source to the next image URL
//     const image = document.createElement('img');
//     image.src = imageUrls[currentImageIndex];

//     // Add the image to the slideshow container
//     slideshowContainer.appendChild(image);

//     // Increment the current image index and loop back to the start if necessary
//     currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
//   }

//   // Call the showNextImage function immediately and then every 2 seconds
//   showNextImage();
//   slideshowInterval = setInterval(showNextImage, 2000);
// }

// // Function to stop the slideshow and redisplay the search form
// function stopSlideshow() {
//   // Clear the interval using the interval ID
//   clearInterval(slideshowInterval);

// }
console.log("good morning developers")
// fetch
// triggered by submission of form
// prevent default
// fetch . then .catch

// select form input from dom 
let formInput = document.querySelector("#formInput")
let slideshowEl = document.querySelector("#slideshow")

// access the images globally
let resultImages

function fetchReddit(e) {
    e.preventDefault()
    // placehold value - hardcoded right now, but later we'll use user input
    // let value = "dogs" // testing only
    // gather user input
    console.log("input =>",formInput.value)
    fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nsfw:no`)
        .then(result => result.json())
        .then(results => {
            console.log(results.data.children)
            let resultImages = results.data.children.map(child => {
            // console.log(results.data.children)
            resultImages = results.data.children.map(child => {
                return {
                    url: child.data.url,
                    title: child.data.title
                }
            })
            console.log(resultImages)
            // filter out bad results
            .filter(image => {
                let imgExtension = image.url.slice(-4)
                return imgExtension === ".jpg" || imgExtension === ".png"
            })
            console.log("inside fetch", resultImages)
            // invoke a function and pass images as argument
            // slideshow(resultImages)
            let slideshowInterval = setInterval(() => {
                slideshow(resultImages)
              }, 3000)

        })
        .catch(console.warn)
}
// fetchReddit() // used for testing only
let imgIndex = 0 

// slideshow function
function slideshow(resultImages) {
    console.log("imgs =>",resultImages)
    console.log("el =>", slideshowEl.src)
    // slideshowEl.src = resultImages[0].url // testing only
    if(imgIndex >= resultImages.length) {
        imgIndex = 0
    }
    slideshowEl.src = resultImages[imgIndex].url
    imgIndex = imgIndex + 1
}



// select dom elements and dave to variables
// create event listeners

let stopBtn = document.querySelector("#stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
})
}
