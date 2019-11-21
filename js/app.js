var userSearch = ''
var imagesUrls = []
var index = 1
var change = 0

//function to filter out any undefined variables at each stage
const filterUndefined = (arr) => {
    return arr.filter((item) => item != undefined)
}

//shorten arrays of urls to 10 images maximum to display
const shortenArray = (arr) => {
    arr = arr.slice(0,10)
    return arr
}

//increment index
const incIndex = (arr) => {
    document.getElementById('image').src = imagesUrls[index]
    $('#image').hide().fadeIn(500)
    index++
    if (index === arr.length) {
        index = 0
    }
    console.log(index)
}

//when submitting remove start div display, show slideshow
const start = () => {
    if (imagesUrls.length == 0) {
        document.getElementById('message').textContent = 'No images were found on this topic! Try entering another phrase.'
        return
    } 
    //insert url values into img and add animation
    document.getElementById('image').src = imagesUrls[0]
    $('#image').hide().fadeIn(500)
    change = setInterval(function() {incIndex(imagesUrls)}, 3000)
    document.getElementById('message').textContent = 'Here is your slideshow:'
    //on start, change screen, start button is gone
    document.getElementById('homepage').style.display = 'none'
    document.getElementById('slideshow').style.display = 'flex'
    //add animations
}

//get the image links
const getImage = () => {
    //grab data from link based on user search
    fetch('http://www.reddit.com/search.json?q='+ userSearch +'+nsfw:no')
    .then(response => {
        return response.json()
    })
    .then(data => {
        //filter down to images URLs
        var children = filterUndefined(data.data.children)
        var preview = filterUndefined(children.map((piece) => piece['data']['preview']))
        var imagesSource = preview.map((image) => image['images'][0]['source']['url'])
        //fix url values to display image, wont show up with amp;s lock
        imagesSource.forEach((url) => imagesUrls.push(url.replace(/amp;/g,'')))
        //get the first 10 images only
        imagesUrls = shortenArray(imagesUrls)
    })
    .catch(err => {
        console.log(err)
    })
}

//when click search button, get images, get slideshow together
document.getElementById('search').addEventListener('click', () => {
    userSearch = document.getElementById('searchBar').value
    if (userSearch.length > 0) {
        //remove error message, continue to get images
        document.getElementById('message').textContent = ''
        //get images function
        getImage()
        document.getElementById('message').textContent = 'Looking for your images...'
        setTimeout(function() {document.getElementById('message').textContent = 'Getting your slideshow now...'}, 4000)
        setTimeout(function() {start()},5000)
    } else {
        //prompt user to enter search
        document.getElementById('message').textContent = 'Please enter a phrase in the search bar to search for images!'
    }
})

//on stop button, search reappear, reset variables
document.getElementById('stop').addEventListener('click', () => {
    userSearch = ''
    imagesUrls = []
    index = 1
    clearInterval(change)
    document.getElementById('message').textContent = ''
    document.getElementById('searchBar').value = ''
    document.getElementById('homepage').style.display = 'flex'
    document.getElementById('slideshow').style.display = 'none'
})
