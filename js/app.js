console.log("hello");
// Global Variables
var INTERVAL_DELAY = 2500;
var interval;
var currentImages = [];
var currentIndex = 0;
var API_URL = 'https://www.reddit.com/search.json?q=';


// EVENT LISTENERS TO THE FORM
document.getElementById('search-form').addEventListener('submit', function(event) {
    // prevent form submission
    event.preventDefault();
    
    // grab the search query
    var query = document.getElementById('query').value;

    // search for that query on reddit
    if(query) {
    fetchReddit(query);

    // EMPTY THE FORM
    document.getElementById('query').value = '';
    }
    else {
        console.log("empty string?");
    }
});

// hides and displays stop button
document.getElementById('stop-button').addEventListener('click', function(event) {
    //HIDE THE RESULTS
    document.getElementById('result-container').style.visibility = 'hidden';
    //SHOW THE SEARCH
    document.getElementById('search-div').style.visibility = 'visible';

    // CLEAR TO INTERVAL
    clearInterval(interval);
});

function fetchReddit(query) {
    // call the reddit API with an AJAX call using fetch
    fetch(API_URL + query + '+nsfw:no') 
    .then(function(response) { return response.json(); })
    .then(function(jsonData) {
        var posts = jsonData.data.children;
        console.log(jsonData);
        console.log('POSTS:', posts);

        // pair down the object to just fields i care about
        var imageObjects = posts.map(function(p) {
            return {
                title: p.data.title,
                url: p.data.url,
                subreddit: p.data.subreddit,
                post_hint: p.data.post_hint
            }
        });
             console.log('IMAGE OBJS', imageObjects);

            currentImages = imageObjects.filter(function(p) {
                return p.post_hint === 'image';
            });

            console.log('IMAGES ONLY', currentImages);

            startSlideshow();
            console.log('IMAGE OBJS', filteredImages);
    })
    .catch(function(err) {
        console.log('ERROR', err);
    })
}

function startSlideshow() {
    // SET THE CURRENT INDEX TO 0
    currentIndex = 0;

    //SET UP THE FIRST IMAGE
    placeImage();
    
    //HIDE THE FORM
    document.getElementById('search-div').style.visibility = 'hidden';
    //SHOW THE RESULTS AND STOP BUTTON

    document.getElementById('result-container').style.visibility = 'visible';
    // CLEAR ANY OLD INTERVAL
    clearInterval(interval);

    //CLEAR AN INTERAL TO SWITCH IMAGE
    interval = setInterval(changeImages, INTERVAL_DELAY);
}

function changeImage() {
    // INCREMENT THE CURRENT INDEX
    currentIndex ++;

    //check the bounds of the array
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    //set up the image
    placeImage();
}

function placeImage() {
    // create an image tag & current image is stored in the currentIndex array
    var img = document.createElement('img');
    img.src = currentImages[currentIndex].url;

    // create an h2 to hole title
    var h2 = document.createElement('h2');
    h2.textContent = currentImages[currentIndex].url;

    //EMPTY THE RESULT DIV OF ANY PREVIOUS IMAGE
    document.getElementById('result').innerHTML = '';

    // ADD THE IMAGE TO THE RESULT DIV
    document.getElementById('result').append(img);
    document.getElementById('result').append(h2);
}




// ============================================================================================================================================================

// document.getElementById('reddit-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     let searchReddit = document.getElementById('query').value;
    
//     if(searchReddit) {
//         console.log(searchReddit);
//         document.getElementById('data').textContent = '';
    
//         fetch('https://www.reddit.com/search.json?q=' + searchReddit)
//             .then(function(resData) {
//                 console.log(resData);
//                 return resData.json();
//             })
//             .then(function(redditData){
//                 console.log(redditData);
//                 redditData.data.children.forEach(function(dataList) {
//                     let divContainer = document.createElement('div');
//                     let image = document.createElement('img');
                    

//                     image.src = dataList.data.thumbnail;
//                     document.getElementById('result').append(divContainer);
//                     divContainer.append(image);

//                 })
//             })
//             .catch(function(error){
//                 document.getElementById('data').textContent = "There's been an error!";
//                 console.log("Oh no, there's been an error!", error);
//             })

//     } else {
//         console.log("search for something!");
//         document.getElementById('data').textContent = "Result not found!";
//     }    
// })
