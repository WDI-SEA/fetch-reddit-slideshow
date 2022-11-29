//CODE ALONG WITH CLASS
//js variables
let images = [] //let images = arrays
let imageIndex = -1
let value = ''
let slideshowInterval
//variables for DOM elements
let formContainer, searchForm, searchInput, stopButton, slideShowContainer
//functions
function fetchReddit(e) {
    //prevent page from refreshing
    e.preventDefault()
//get value that the user typed into the form
    value = searchInput.value
    //put that value in the search url and do a fetch to reddit
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(anything => anything.json())
        .then(redditJson => {
            // console.log(redditJson.data.children);
            //map reddit data to our images array
            images = redditJson.data.children.map(child => {
                return {
                    url: child.data.url, 
                    author: child.data.author,
                    ups: child.data.ups, 
                    subreddit: child.data.subreddit
                }
            })
            //filter out non image results
                .filter(image => { //adding filter to end of map
                    const fileExtension = image.url.slice(-4)
                    return fileExtension === '.jpg' || fileExtension=== '.png'
                // console.log(image.url.slice(-4)); //will wrap back around the string and search for certain characters
                    
            })
            // console.log(images);
            //start the slideshow
            slideshow()
            slideshowInterval = setInterval(slideshow, 1000)
            //hide the form and show the stop button in its place
            formContainer.style.display = 'none'
            stopButton.style.display = 'inline'
        })
        .catch(console.warn)
}
function clearElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

function stop() {
    //clear the slideshow
    clearInterval(slideshowInterval)
    clearElement(slideShowContainer)
    //hide stop button
    stopButton.style.display ='none'
    //show form
    formContainer.style.display ='block'
    //reset all state
    //reset all state (to be good programmers)
    images = []
    imageIndex = -1
    value = ''
}
function slideshow() {
    //increment value
    imageIndex++
    //check to make sure we are not out of bounds ? wrap back to 0
    if (imageIndex >= images.length) {
        imageIndex = 0
    }
    //change slideshow
    //clear out slideshow container
    clearElement(slideShowContainer)
    //create the dom els we want
    const newImage = document.createElement('img')
    const newH2 = document.createElement('h2')
    const newSubP = document.createElement('p')
    const newUpsP=document.createElement('p')
    //set the poperties of the dom elements
    newImage.src = images[imageIndex].url
    newImage.alt = value
    newH2.innerText = image[imageIndex].author
    newSubP.innerText = image[imageIndex].subreddit
    newUpsP.innerText = image[imageIndex].ups
    //mount the elements on the slideshow contianer'
    slideShowContainer.append(newImage, newH2, newSubP, newUpsP)

}
// DOM content loaded function to put everything that needes to be grabbed load up the variables for DOM elements
document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.querySelector('#formContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector('#stopButton')
    slideShowContainer = document.querySelector('#slideShowContainer')
// console.log(formContainer, searchForm, searchInput, stopButton, slideShowContainer)
    // MOUNT EVENT LISTENERS
    searchForm.addEventListener('submit', fetchReddit)
    stopButton.addEventListener('click', stop)
    //HIDE STOP BUTTON
    stopButton.style.display = 'none' //hides display of stop button for better user experience
})



















//MY DELIVERABLE
// const randomImageDiv = document.getElementById('randomImage')
// const searchBtn =document.getElementById('searchBtn')

// const getNewImg = () => { //when getNewImg function is called, it fetchs the url data, turns response to json and updates image
//     fetch('http://www.reddit.com/search.json?q=tacos+nsfw:no') //create fetch function
//     .then(response => response.json()) //.then will prevent responseData function from running until ready  //raw data blob will be turned to json data
//     .then(json => {
//     console.log(json.data.children[0].data.thumbnail) //need to find out how to mad just the thumbnail of every array
//     randomImageDiv.innerHTML =` <img src='${json.data.children[0].data.thumbnail}' height=200 width=200/>`
//     })
// }


//     searchBtn.onclick = () => getNewImg () //when click is detected, getNewImg function will run each time
//     //things i need to google:
//     // how to fetch api request
//     //how do i deal with promises
//     //how to get a json file from a promise
                



    // console.log('script is linked');
    // //API -- Application Programming Interface or Application Protocol Interface
    // // API is a piece of software that is desined to talk to another piece of software -- Defines how other code will tlak to yours/how your code should talk to other code.
    // //DATA API --software that is designed to send data over the internet. (servers)
    // // Fetch is a browser API that allows us to make HTTP requests.

    // //https://swapi.dev/api/films/
    // document.addEventListener('DOMContentLoaded', () => { //will not run anything until DOM content is loaded
    //     //window.fetch() --retrieves data from our data API
    //     fetch('https://swapi.dev/api/films/') //.then will prevent responseData function from running until ready
    //         .then(responseData => {   //use .then to pass in callback function. keyword function not used on => function
    //             return responseData.json() //raw data blob will be turned to json data
    //         })
    //         .then(swapiJson => { //.then again waits for responseData.json to complete before running swapiJson =>
    //             console.log(swapiJson.results); //clg the actual useable data
    //             //loop over each movie and append the title and opening crawl to webpage
    //             //select the body
    //             const body = document.querySelector('body')

    //             swapiJson.results.forEach(result => {
    //                 //STEP NUMBER ONE create some elements to load on the body
    //                 const div = document.createElement('div')
    //                 const p = document.createElement('p') //innerText set to be opening crawl
    //                 const h2 = document.createElement('h2') //innerText set to be title
    //                 //STEP NUMBER TWO modify the properties
    //                 p.innerText = result.opening_crawl
    //                 h2.innerText = result.title
    //                 console.log(p, h2);
    //                 //SßTEP NUMBER THREE append new elements to the DOM / this step will add information to webpage
    //                 div.append(h2, p)
    //                 body.append(div)

    //             });

    //         })


        //     const requestUrl = 'https://randomuser.me/api/?results=' //set how many arrays are sent back with ?results=10' key/value (query string)
        //     document.querySelector('form').addEventListener('submit', e => {
        //         //tell the form to not refresh the page
        //         e.preventDefault()
        //         const numberOfPeople = document.querySelector('#number').value
        //         console.log(numberOfPeople)
        //         fetch(requestUrl + numberOfPeople)
        //             .then(responseData => responseData.json()) //implicit return arrow function
        //             .then(peopleData => {
        //                 console.log(peopleData)
        //                 const peopleList = document.querySelector
        //                     ('#peopleList')
        //                 console.log(peopleList)
        //                 // const li = document.querySelector('body')
        //                 peopleData.results.forEach(person => {
        //                     console.log(person.name.title, person.name.first, person.name.last)
        //                     const li = document.createElement('li')
        //                     li.innerText = `${person.name.title} ${person.name.first} ${person.name.last}`

        //                     peopleList.append(li)

        //                 })
        //             });

        //         // .catch (console.warn)
        //     })


        // });
