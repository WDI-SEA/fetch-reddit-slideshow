
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


//hide slideshow items -check
function hideSlides() {
    document.getElementById("stop").style.display = "none";
}

//unhide slideshow class items - check
function unhideSlides () {
    document.getElementById("stop").style.display = "block";
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
        e.preventDefault()
        //hide openPage class items
        hideStart()

        //unhide slideshow
        unhideSlides ()
        
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
            // console.log("input field value",input.value) - check- is working

            //create an array of URLs by using filter to find urls from redditData
            const arrayURL = redditData.data.children
            console.log(arrayURL)
            const filteredArray = arrayURL.filter(function(arrayObject) {
                //define URLString by checking the object for the url location, then slicing the last 4 to check for images
                let URLstring = arrayObject.data.url.slice(-4)
                // console.log (URLstring) - check

                //
                let urlString = arrayObject.data.url
                // console.log(urlString) - check
                //need to return image URL that has png or jpg at the end of reddit data 
                if(URLstring === ".jpg" || URLstring === ".png") {
                    return urlString //this will not return a URL, it will only return true or false, to keep that object in the new filtered array
                }
            })

            //this creates a new Array that only has URL values that have been filtered through the above function. Takes away the rest of the object values. 
            //creates array with only urls
            const newArray = filteredArray.map(function(arrayObject) {
                return arrayObject.data.url
            })
        
            // console.log(filteredArray)
            console.log(newArray)

            //for each URL we are removing old display, adding new images 
            //make sure to add a URL when calling the function
           function addNewImg (url) {
                 //need to delete images 
                //this says as long as there is something in the Div, remove it out. If there's nothing there, the while loop stops, but it does not work. It says that imgs is not a child
                let imagesDiv = document.getElementById('imagesDiv')
                while(imagesDiv.firstChild) { 
                    imagesDiv.removeChild(imagesDiv.firstChild)
                }
                console.log(url)
                //Need to add image urls to html div
                //first remove old images
                
                console.log(imagesDiv)
                //old images are gone, must create a new image
                //now create a new img element
                let newImg = document.createElement("img")
               //set the new image value to a URL from the filtered list of array URLs
                newImg.src = url
                console.log(newImg.src)
                //add parameters for making the images a certain size
                newImg.style.height = "400px"
                newImg.style.width = "400px"
                newImg.style.border = "3px solid purple"
    
                //append it to the imagesDiv
                imagesDiv.append(newImg)

                console.log(imagesDiv)

                console.log(newArray.length)
                if(index < newArray.length){
                return index ++
                } else {
                return index = 0
                }
        }
        
        //this starts with image array 0, cycles through all the array and loops around again
        let index = 0
        addNewImg (newArray[index])
        let newSlideshow = setInterval(function() {
            addNewImg(newArray[index])
        }, 5000)

        //reset button functionality
        stop.addEventListener('click', function () {
            clearInterval(newSlideshow)
            hideSlides()
            unhideStart()
            input.value = ""
            //need to add a remove images function
            let imagesDiv = document.getElementById('imagesDiv')
                while(imagesDiv.firstChild) { 
                    imagesDiv.removeChild(imagesDiv.firstChild)
                }
            }) 

        })//then reddit data

    })//fetch request
            
})//content loaded

    
// * Add some interesting style / animation