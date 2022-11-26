
// * Create your form (HTML/CSS)
let searchPage = document.querySelector('.openPage')

let header = document.querySelector('h1')
let para = document.querySelector('p')
let input = document.querySelector('input')
let search = document.querySelector('#search')
let images = document.querySelector('#stop')
let imgs = document.getElementById("imgs")



//hide slideshow items -check
document.getElementById("stop").style.display = "none";
document.getElementById("imgs").style.display = "none";

function hideSlides() {
    document.getElementById("stop").style.display = "none";
    document.getElementById("imgs").style.display = "none";
}

//unhide slideshow class items - check
function unhideSlides () {
    document.getElementById("stop").style.display = "block";
    document.getElementById("imgs").style.display = "block";
}

//hide start page -check
function hideStart () {
    header.style.display = "none";
    para.style.display = "none";
    search.style.display = "none";
    input.style.display = "none";

}

//unhidde start page - check
function unhideStart() {
    header.style.display = "block";
    para.style.display = "block";
    search.style.display = "block";
    input.style.display = "block";
}

//reddit URL
const requestURL = `http://www.reddit.com/search.json?q=${input}+nsfw:no`
console.log(input.value)
//function to fetch data from reddit
document.addEventListener('DOMContentLoaded', () => {
    
//event listener for search button pressed, main wrapper
    search.addEventListener('click', function (e) {
        //hide openPage class items
        hideStart()
        //Could add a load page here and move unhideSlides into the next function...think about it
        //unhide slideshow
        unhideSlides ()

        e.preventDefault()
        //fetching data from input field and search query link
        console.log(requestURL)
        fetch(requestURL, {
            headers: {
            'Accept': 'application/json'
                }
            })
            .then(responseData => responseData.json()) 
            .then(redditData => {
            console.log(redditData)
            console.log(input.value)
            //this will update the inner html element with the image source link, hypothetically
            imgs.innerText = redditData.img.src
            console.log(imgs.innerText)
            //use timeout functions (set & clear Intervals) to let images display for a short time

            //use filter & map functions to create image URLs


            // setTimeout(function() {
            //     setInterval(function() {
            //         console.log('tock')
            //         let newURL = requestURL.map(function(){
            //             //   return `${weather.day} will have a high of ${weather.high}F and a low of ${weather.low}`
            //     }, 500)
            // }, 10000)

            })
            
            
            
    })
})
    
// })

//button to stop slideshow
//function unhides openPage Elements and hides 
    
    
        


// * Prevent default form submission and verify that you can type something into the form
// * Use AJAX to make a request. Show data in console
// * Create an array of image URLs (tip: use [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)).
// * Make the form / title / description hide
// * Cycle through images
//     * tip: use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)
//     * Either add images, or change the `src` of a single image tag
// * Add some interesting style / animation
// * Create button to stop animation (tip: use [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)).