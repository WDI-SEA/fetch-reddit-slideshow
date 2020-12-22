

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
const loadingImage = document.querySelector('.loadingImg');

function hideStuff() {
    stuffToHide.style.display = "none";
}

function getImgArrayFromReddit(searchValue) {
    fetch(`http://www.reddit.com/search.json?q=${searchValue}+nsfw:no`)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            console.log(jsonData.data.children);
            // .children[0].data.thumbnail
            // create an array of img urls
            let imgArray = jsonData.data.children.map(child => {
                return child.data.thumbnail
            })
            console.log(imgArray);
        }).catch(error => {
            console.log(error)
        })
}

function displayImages(imageArray) {
    loadingImage.style.display = 'block';
}

document.addEventListener("DOMContentLoaded",() => {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        hideStuff();
        displayImages();
        getImgArrayFromReddit(searchBar.value);
        console.log(searchBar.value);
    })
})

