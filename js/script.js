// console.log('sync')

// // //http://www.reddit.com/search.json?q=cats+nsfw:no

// // const imgUrl = 'http://www.reddit.com/search.json?q=${search}+nsfw:no'
// // const jokeUrl = 'https://icanhazdadjoke.com'

// // // document.addEventListener('DOMContentLoaded', () => {

//     const search = document.getElementById('search')
//     let button = document.getElementById('button')
//     //let userInput = search

// //     // search.addEventListener('click', () => {
// //     //     fetch(imgUrl)
// //     // })

// //     const getPosts = () => {
// //          return fetch('http://www.reddit.com/search.json?q=cats+nsfw:no')
// //         .then (responseData => responseData.json())
// //         .then(data => {
// //             console.log(data)})
// //     }


// function onceClicked() {
//     button.addEventListener('click', () {
//     fetch(`http://www.reddit.com/search.json?q=${search}+nsfw:no`) 
//      .then(responseData => {
//          return responseData.json()
//      })
//     //  .then(redditJson => {
//     //     .images.appendChild(redditJson)
//     //  })
//     .then(data => {
//         let hideP1 = document.getElementsByClassName('.hide')
//         // how do we hide stuff
//         if(search === 'click') {
//             classList.add.('removeBeg')
//         }
//     })
//     // how to show images?
    
    

    
    
//     let button2 = creatElement('button');
//     button2.innerText = "Stop"

    
    
    
    
//     //final step
//     classList.remove.('removeBeg')
//   }) 
// }

// //     fetch('https://swapi.dev/api/films')
// //    .then(responseData => {
// //         return responseData.json()
// //     })
// //     .then(swapiJson => {
// //         console.log(swapiJson.results)
        
// //     })

// // make a if else for each button?

// //})
console.log('teachers code')

// js variables

let images = []





// variables for DOM elements 

let formContainer, searchForm, searchInput, stopButton, slideContainer




//functipns 

function fetchReddit(e) {
    //prevent the page from refreshing
    e.preventDeafault()
    // get the value that the user typed into the form
    const value = searchInput.value
    console.log(value)
    // put that value in the search url and do a fetch to reddit
    fetch(`http://www.reddit.com/search.json?q=${value}+nsfw:no`)
        .then(redditData => redditData.json())
        .then(redditJson => {
            // console.log(redditJson.data.children)
            // map reddit data to our images array
            images = redditJson.data.children.map(child => {
                    return {
                        url: child.data.url,
                        author: child.data.author,
                        ups: child.data.ups,
                        subreddit: child.data.subreddit
                    }
                })
                // filter out non image results
                .filter(image => {
                    // console.log(image.url.slice(-4))
                    const fileExtension = image.url.slice(-4)
                    return fileExtension === '.jpg' || fileExtension === '.png'
                })
            console.log(images)
            // start the slideshow
        })
        .catch(console.warn)
}



//DOM contented loaded -- load up the variables for DOM els

document.addEventListener('DOMContentLoaded', () => {
    formContainer = document.querySelector('#formContainer')
    searchForm = document.querySelector('#searchForm')
    searchInput = document.querySelector('#searchInput')
    stopButton = document.querySelector('#stopButton')
    slideContainer = document.querySelector('#slideShowContainer')
    //mount event listeners 
    searchForm.addEventListener('submit', fetchReddit)
    //hide stop button
    stopButton.style.display = 'none'
})
