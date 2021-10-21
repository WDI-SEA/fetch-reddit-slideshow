//Display a reddit slideshow
//  add nsfw:no to the end of the search query to filter out undesireable images.

//On Document Load
//1. Title
//2. short description telling the user what to do
//3. blank text field
//4. a Search Button

//When the user searches
//1. the form/title/description should "hide"
//2. fetch images using 'fetch'
//3. display slideshow/animation
//4. show a button to stop animation.
//5. repeat slideshow until stop button is clicked

//when stop button is clicked
//1. slideshow is removed
//2. Form/Tital/Description are shown again to be restarted.

const requestUrl = "https://www.reddit.com/search.json?q="
const nsfw = "+nsfw=no"
const imageKind = "+kind=image"

//image Array
let imageArr = []

//on Document Load, I want to be able to take input
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        //This stops the browser from refreshing
        e.preventDefault()
        //Run my fetch procedures using the url, input, value, and nsfw value
        fetch(requestUrl+input.value+imageKind)
        .then((responseData) => {
            //This takes the response from the reddit API and extracts the json object data we're interested in
            return responseData.json()
        })
        .then((jsonData) => {
            //This is where we need to explore our json data, find the images, and add them to our DOM
            //using our function.
            const jsonObject = jsonData.data.children
            for(let i = 0; i < jsonObject.length; i++){
                const dataThumbnail = jsonObject[i].data.thumbnail
                if(dataThumbnail !== 'self' && dataThumbnail !== 'default' && dataThumbnail !== 'image') {
                    imageArr.push(dataThumbnail)
                } else {
                    console.log(`Data point ${dataThumbnail} does not have a thumbnail.`)
                }
            }
            console.log(imageArr.length)

        })
        .catch((error) => {
            //in case there is an error in one of the above steps, this will print an error.
            console.log("Error: ", error)
        })
    })
    //This function is responsible for both removing existing body elements and adding the slideshow with a button.
})

const addRemoveFunction = () => {
    //Remove Everything: First, let's try to remove everything.
    //Get each element in the body by it's class Name.
    //Access the document body and use the remove() for each element.
    const bodyElements = document.querySelectorAll(".bodyContent")
    console.log(bodyElements.length)
    for (let i = 0; i < bodyElements.length; i++) {
        document.querySelector(".bodyContent").remove()
    }
    
    //Add Slideshow and Button
    //Slideshow section
    const divEl = document.createElement('div')
    divEl.classList.add("bodyContent")
    divEl.textContent = 'Slideshow goes here!'
    document.body.appendChild(divEl);
    
    //Button 
    const buttEl = document.createElement('button')
    buttEl.classList.add("addStopBtn")
    buttEl.type = "Submit"
    buttEl.textContent = "Reset"
    document.body.appendChild(buttEl)
    //addEventListener to stop button to reset document
    const newButtEl = document.querySelector(".addStopBtn")
    newButtEl.addEventListener('click', () => {
        console.log("I made it!")
        location.reload()
    })
}

// addRemoveFunction()
