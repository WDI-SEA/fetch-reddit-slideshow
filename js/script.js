// THINGS TO DO

// create image container variale to append images to
const returnButton = document.getElementById('return-button');
const searchButton = document.getElementById('search-button');
let imageContainer = document.querySelector('#slideshow-container');
// image array
let imgArr= [];

let searchReddit = () => {
    //input from search bar - will add to endpoint
    let input = document.querySelector('#search-bar').value;
    // API URL
    const endpoint = `http://www.reddit.com/search.json?q=${input}+nsfw:no`;
    fetch(endpoint)
    .then(fetchObj => fetchObj.json())
    .then((jsonData) => {
        addImages(jsonData.data.children);
    })
    .catch(err=>console.log('error fetching dataa', err))
}

const addImages = (apiResults) => {
    document.getElementById('return-button').style.display = 'block';

    let picsArray = apiResults.filter((result)=> {
        if (result.data.thumbnail == "self" || result.data.thumbnail == "spoiler" || result.data.thumbnail == "default") {
            return false;
        } else {
            return true;
        }
    })
    
    for (let i=0; i<11; i++) {
        //create a new image
        imgArr[i] = document.createElement('img');
        // console.log(apiResults[i].data)
        imgArr[i].src = picsArray[i].data.thumbnail;
        //append the image to the container
        imageContainer.appendChild(imgArr[i]);
        //make each image invisible
        imgArr[i].style.display = 'none';
    }

    let n = 0
    console.log(imgArr)
    const slideshow = setInterval(function(){
        if (n == 0) {
            imgArr[n].style.display = 'block';
        } else if (n == imgArr.length-1) {
            imgArr[n-1].style.display = 'none';
            imgArr[0].style.display = 'block';
            n = 0;
        } else {
            imgArr[n - 1].style.display = 'none';
            imgArr[n].style.display = 'block';
        }  
        n++;
    }, 1800)
    
    // return button function click
    returnButton.addEventListener('click', (e)=> {
        // prevent refreshing the page
        e.preventDefault();
        // stop slideshow
        clearInterval(slideshow);
        // reset image array to empty
        while(imageContainer.firstChild) {
            imageContainer.firstChild.remove()
        }
        imgArr = []
        // hide display container
        document.getElementById('slideshow-container').style.display = 'none';
        // re-display opening container
        document.getElementById('opening-container').style.display = 'block';
        // hide return button
        returnButton.style.display = 'none';
    })
}

// search button function on click
searchButton.addEventListener('click', (e)=>{
    //prevent refreshing the page
    e.preventDefault();
    // hide opening div
    document.querySelector('#opening-container').style.display = 'none';
    // call reddit fetch function here
    searchReddit();
    // show display container
    document.getElementById('slideshow-container').style.display = 'flex';
})
