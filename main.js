

// when user enters search - hide everything initially on page
//
//fetch posts from reddit with (fetch)

//display animation/slideshow of imgs

//show button to stop/reset animation

//repeat until user clicks stop



//
const submit = document.getElementById('go');
const searchBar = document.getElementById('search');
const stuffToHide = document.querySelector('.hideStuff');
const slideshowImage = document.querySelector('.loadingImg');
let storedArray = [];
let imageToBeShown = 0;

function hideStuff() {
    stuffToHide.style.display = "none";
}

function getImgArrayFromReddit(searchValue) {
    fetch(`http://www.reddit.com/search.json?q=${searchValue}+nsfw:no`)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            // console.log(jsonData.data.children);
            // .children[0].data.thumbnail
            // create an array of img urls
            return jsonData.data.children.map(child => {
                return child.data.thumbnail
            })
        })
        .then(imageArray => {
            // setInterval(displayImages(imageArray), 1000)
            // displayImages(imageArray)
            setInterval( ()=> displayImages(imageArray), 1000);
        })
        .catch(error => {
            console.log(error)
        })
}


function displayImages(imageArray) {
    console.log(imageArray)
    if (imageToBeShown > 25) {
        imageToBeShown = 0;
    }
    console.log("imageToBeShown", imageToBeShown)
    slideshowImage.style.display = 'block';

    if (imageArray[imageToBeShown] !== "self" &&
    imageArray[imageToBeShown] !== "default" &&
    imageArray[imageToBeShown] !== undefined) {
        slideshowImage.src = imageArray[imageToBeShown];
    }
    imageToBeShown++;
    // check if there is a thumbnail
    // if not, ignore
}

document.addEventListener("DOMContentLoaded",() => {
    submit.addEventListener('click', (e) => {
    
        e.preventDefault();
        hideStuff();
        // displayImages();
        getImgArrayFromReddit(searchBar.value);
        // setInterval(displayImages(storedArray), 1000);
        // console.log(searchBar.value);
    })
})

