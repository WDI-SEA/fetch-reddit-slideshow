const API_URL = 'https://www.reddit.com/search.json?nsfw=no&q='
//declare constants and global variables
// let images = document.getElementById('pictures');
const INTERVAL_DELAY = 1000
let currentImages = []
let currentIndex = 0
let interval = null

document.getElementById('formy').addEventListener('submit', (e) => {
    //prevents the form's natural behavior of refreshing the page
    e.preventDefault()
    //grab the user's query
    let userQuery = document.getElementById('userinput').value
    //Make sure the user actually typed something
    if (userQuery) {
        fetchReddit(userQuery)
    }
    else {
        console.log('type something')
    }
    console.log('you clicked me >;(', userQuery)
})

//equivalent to .then((response) => { return response.json()})
//fetch function
const fetchReddit = (userQuery) => {   //we defined userQuery for the words the user inputs into the search form
    console.log('You will search reddit for', userQuery)
    //call reddit API using fetch function
    fetch(API_URL + userQuery)
    .then(response => response.json())
    .then(jsonData => {
        //this is the data, we defined the variable as jsonData, here is where we do stuff with it
        console.log('success')
        console.log(jsonData.data.childen) //add . followed by the part of the data you want to access
        let results = jsonData.data.children.filter((item) => {//gets array with filter by image, item is the object in the array we're accessing
            console.log(item.data.post_hint)
            return item.data.post_hint == 'image'  //returns the resulted array like a push function, filtered with a boolean for only images
        }).map((item) => {
            return {
                title: item.data.title,
                url: item.data.url,
                subreddit: item.data.subreddit,
                upvotes: item.data.ups,
                downvotes: item.data.downs,
                gold: item.data.gilded > 0,
            }
        })
        console.log('These are the results', results)
        currentImages = results //fills currentImages with results array
        startSlideshow()
    })
    .catch(err => {
        // happens if something breaks
        console.log('Error', err)
    })
}

//start the slideshow
const startSlideshow = () => {
    console.log('start')
    //hide the search bar
    document.getElementById('frontpage').style.display = 'none'
    //hide the title
    document.getElementById('banner').style.display = 'none'
    //clear the search bar
    document.getElementById('userinput').value = ''
    //show the slideshow div
    document.getElementById('slides').style.display = 'block'
    //change the background color
    document.getElementById('results').style.display = 'block'
    document.getElementById('body').style.background = '#363333'
    //change the header and footer colors
    document.getElementById('header').style.background = '#ff5700'
    document.getElementById('footer').style.background = '#ff5700'
    //display the first image
    displayCurrent()
    //kick off the interval
    interval = setInterval(iterateImage, INTERVAL_DELAY)
}

//Display current image
const displayCurrent = () => {
    //empty previous images
    document.getElementById('results').innerHTML = ''; //hides the current image and text
    //create an image tag
    let img = document.createElement('img')//creates elements and displays them in the div
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    img.setAttribute('class', 'picture')
    img.setAttribute('id', 'picture')
    //create an h3 to hold the title
    let h3 = document.createElement('h3')
    h3.textContent = currentImages[currentIndex].title
    h3.setAttribute('class', 'readit')
    //place newly created elements in the DOM
    document.getElementById('results').append(img)  //.setAttribute('class', 'picture')
    document.getElementById('results').append(h3)
}

const iterateImage = () => {
    if (currentIndex >= currentImages.length) { //sends the slideshow back and loops the array on interval
        currentIndex = 0
    }
    //use a fade out instead, but how????
    document.getElementById('results').innerHTML = ''; //hides the current image and text
    currentIndex++  //iterates the index of the image being displayed
    displayCurrent()    //displays the next image
    console.log(currentImages.length)
     
}

const endSlideshow = () => {        //reverses the changes and functions in startSlideshow
    document.getElementById('frontpage').style.display = 'block'
    //hide the title
    document.getElementById('banner').style.display = 'block'
    //show the slideshow div
    document.getElementById('slides').style.display = 'none'
    //change the background color
    document.getElementById('results').style.display = 'none'
    
    document.getElementById('body').style.background = '#cee3f8'
    //change the header and footer colors
    document.getElementById('header').style.background = '#0077D6'
    document.getElementById('footer').style.background = '#0077D6'
    currentImages = []
    currentIndex = 0
    clearInterval(interval)    // I know something's wrong with my interval. clearInterval() is not working
}

 document.getElementById('endshow').addEventListener('click', endSlideshow)  // () => {
//     clearInterval(interval)
//     const endSlideshow = () => {        //reverses the changes and functions in startSlideshow
//         document.getElementById('frontpage').style.display = 'block'
//         //hide the title
//         document.getElementById('banner').style.display = 'block'
//         //show the slideshow div
//         document.getElementById('slides').style.display = 'none'
//         //change the background color
//         document.getElementById('results').style.display = 'none'
        
//         document.getElementById('body').style.background = '#cee3f8'
//         //change the header and footer colors
//         document.getElementById('header').style.background = '#0077D6'
//         document.getElementById('footer').style.background = '#0077D6'
//         currentImages = []
//         currentIndex = 0
//         interval = null

// })
// //document.getElementById('endshow').addEventListener('click', function (evt) {evt.submit()})
