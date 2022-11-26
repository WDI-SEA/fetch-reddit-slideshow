
// * Create your (HTML/CSS)
let searchPage = document.querySelector('.openPage')

let header = document.querySelector('h1')
let para = document.querySelector('p')
let input = document.querySelector('input')
let search = document.querySelector('#search')
let stop = document.querySelector('#stop')
let imgs = document.getElementById("imgs")


//hides slideshow elements until event listener is called
document.getElementById("stop").style.display = "none";
document.getElementById("imgs").style.display = "none";

//hide slideshow items -check
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

//reddit URL with search query updated with input value - check
let requestURL = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
// console.log(input.value)

//function to wait until content is loaded
document.addEventListener('DOMContentLoaded', () => {
    
//event listener for search button pressed, main wrapper
    search.addEventListener('click', function (e) {
        //hide openPage class items
        hideStart()

        //Could add a load page here and move unhideSlides into the next function...think about it

        //unhide slideshow
        unhideSlides ()
        
        e.preventDefault()
        
        //update the URL first because it didn't have any value outside of teh event listener - check
        requestURL = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        // console.log(requestURL, 'inside event listener')

        //fetching data from input field and search query link
        fetch(requestURL, {
            headers: {
            'Accept': 'application/json'
                }
            })
            .then(responseData => responseData.json()) 
            .then(redditData => {
            console.log(redditData)
            console.log("input field value",input.value)

             //this should set an interval for the length of time an image is displayd
             setInterval(function() {
                console.log('timer')
                //keep track of an index and update index at the interval time
                //will be the current postiion
                //will start over at the end of the array (start at 0)
            // runs the length of the data list and checks for 
            }, 10000)

            //every ten seconds get a new index in the array below
            //add only the images to a global array (filter function)

            for(let i = 0;redditData.data.children.length > i; i++) {
                //checks the url link for an image tag
                let URLstring = redditData.data.children[i].data.url.slice(-4)
                let newURL = redditData.data.children[i].data.url

                    //if its an image, run this code
                    if(URLstring === ".jpg" || URLstring === ".png") {
                        console.log('this is the new url', newURL)
                        //clear new div
                        let imagesDiv = document.querySelector('#imagesDiv')
                        imagesDiv.innerHTML = ""
                        //create an image element
                        let newImg = document.createElement("img")
                        //set the src to url
                        newImg.src = newURL
            
                        //appends new images to div
                        imagesDiv.append(newImg)
                    }
                }


            

            //use timeout functions (set & clear Intervals) to let images display for a short time

            //use filter & map functions to create image URLs


            
            })

            })
            
    
            
    })
// })
    
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