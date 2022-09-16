//Declaration of variables
const slidesshowDiv = document.querySelector('#slideshow')
const form = document.querySelector('#form')
//Create array of images URLs
const imgArray = []

//searchReditSuccess Function
const onSearchRedditSuccess = (resultsArray) => {
     console.log(resultsArray)
    resultsArray.data.children.forEach(result => {
        //Get Image URL
        const imageURL = result.data.url
        //Filter url to only show image urls
        if (imageURL.includes('.jpg') || imageURL.includes('.png')) {
            imgArray.push(imageURL)
        }
    });
    //Call Print Images Function
    printImages()
}

//Make Slide Function
const slide = (image) => {
    
}

//Print all images on the page
const printImages = () => {
    //Make Slide show
    const img = document.createElement('img')
    let index = 0
    let interval = 2000
    const slide = () => {
        img.src = img[index++%imgArray.length]
    }
    setTimeout(function() {
        slide();
        setTimeout(arguments.callee, interval)
    }, interval);

    // Clear Images printed before
    while(slidesshowDiv.firstChild) {slidesshowDiv.removeChild(slidesshowDiv.firstChild)}
    imgArray.forEach(image => {
        console.log('this works')
        const img = document.createElement('img')
        img.setAttribute('src', image)
        console.log(img)
        //Append to Slideshow
        slidesshowDiv.appendChild(img)
    })

}

//Get Input from Form
form.addEventListener('submit', event => {
    //Prevent reload of the page
    event.preventDefault()
    //Get Search item
    //URL sample- http://www.reddit.com/search.json?q=cats+nsfw:no
    const searchText = input.value
    //Search for user query
    fetch(`http://www.reddit.com/search.json?q=${searchText}+nsfw:no`)
    .then(res => res.json())
    .then(onSearchRedditSuccess)
    // .then(console.log)
    .catch(console.error)
})