var API_URL = "http://www.reddit.com/search.json?limit=20&q=";
var currentImage = []
var INTERVAL_DELAY = 2000
var currentIndex = 0
var interval 

document.addEventListener("DOMContentLoaded", function() {
    // Hook up a sunmit event listener to submit button
    document.getElementById('search-form').addEventListener('submit', fetchFromReddit)

    //hook up a click event listener to the stop button
    document.getElementById('stop').addEventListener('click', stopSlides)
}) 

function fetchFromReddit(e) {
    // Please don't refresh the page
    e.preventDefault()
    // Grabbing the value out of the textbox
    var query = document.getElementById('query').value

    // Make sure query is not empty string
    if (query) {
    //Call Reddit Api with fetch
    fetch(API_URL + query)
    .then(function(responseObj) {
        return responseObj.json()
    })
    .then(function(jsonResults) {
        var results = jsonResults.data.children
        console.log(jsonResults)
        // Take the values we want from the enormous JSON object
        currentImagaes = results.map(function(post) {
            //Downsize the object
            return {
                subreddit: post.data.subreddit,
                title: post.data.title,
                url: post.data.url('.gifv', '.gif')
            }
        })
        .filter(function(item) {
            //Some filter for image posts (remove text posts)
            return item.url.includes('i.imgur' || item.url.includes('i.redd'))
        })
        console.log('current Images are', currentImagaes)
        //Reset the currentIndex to the first one
        currentIndex = 0

        //Load first image into the DOM
        loadImage()

        //clear old timer before setting a new one
        clearInterval(interval)

        //kick off an interval to swap the pics
        interval = setInterval(changeSlide, interval_DELAY)
    })
    .catch(function(err) {
        console.log('error', err)
    })
} else {
    console.log('Nothing to search???')
}
}
function loadImage() {
    //Empty the existing slides from slideshow div (if any)
    var slideshow = document.getElementById('slideshow')
    slideshow.innerHTML = ''

    //Create a new image slide
    var newImg = document.createElement('img')
    newImg.src = currentImagaes[currentIndex].url
    newImg.style.width = '300px'
    newImg.style.height = 'auto'

    //Append Img into slideshow div
    slideshow.append(newImg)

    //Change title to post;s title
    document.getElementById('title').textContent = currentImagaes[currentImagaes].title

    //Change subreddit to subreddit
    document.getElementById('subreddit').textContent(currentImages[currentIndex].subreddit)
}

function changeSlide() {
    //Increment the image index
    currentIndex++

    //check and make sure the index os valid - set back to 0 if too big
    if(currentIndex >= currentImage.length) {
        currentIndex = 0
    }

    //Load the next page
    loadImage()
}

function stopSlides() {
    // stop the slides
    clearInterval(interval)
}







// function main() {
//     //TODO assign a listener to the button that fetches images
//     var button = document.getElementById("search")
//     button.addEventListener("click", getImages)
//     // Prevent default form submission and verify that you can type something into the form
//     event.preventDefault()
//     getImages(REQUEST_URL)
// }

// function getImages(REQUEST_URL) {
//     document.getElementById('search').addEventListener('click', function(e) {
//         console.log('search')
//     });
//         // define url
//         // retrieve images from URL
//         var data = document.getElementById("searchTerm").value;
//         fetch(REQUEST_URL)
//         .then(function(data) {
//             var newData = data.json()
//             return newData
//         })
//         .then(function(jsonData) {
//             // Create an array of image URLs (tip: use filter and map).
//             var images = []
//             var imageCounter = 0;
//             json.data.children.forEach(function(item) {
//                 images.push(item.data.url);
//                 setInterval()
//                 //console.log(item.data.url) 
//             })
//             // Cycle through images
//             var images = images.filter(function (image) {
//                 if (image.includes('jpeg') || image.includes('jpg') || image.includes('png')) {
//                     return true;
//                 } else {
//                     return false;
//                 }
//             })
//             // Make the form / title / description hide
//             // tip: use setInterval
//             setInterval(function() {
//                 imgElement.src = images[imageCounter];
//                 imageCounter++;
//                 if (imageCounter === images.length) {
//                     imageCounter = 0;
//                 }
//             }, 1000);
//         })
//     }    
