
//////////////////////
//universal variables
/////////////////////

//track the picture on display
let picTracker = 0
//collect pictures from json
let slideshow
let pics = []
let filteredPics = []
//declare url for fetch
const requestUrl = "https://www.reddit.com/search.json?q="

///////////////////////////
////////universal functions 
///////////////////////////

//hide the image on display, display next image in the queue 
const takeTheStage = (array) => {
    //is this fuctnion working and with the desired variables
    console.log(`tTS is working: tracker = ${picTracker}`)
    console.log(`need to Display array[${[picTracker]}] with ${array[picTracker]}`)
    //displya the image found at next url in the array
    stage.src = `${array[picTracker]}`
    //increment or reset tracker to 0 to maintain loop
    if (picTracker === array.length) {
        console.log(`inside tracker checker!: tracker === array.length `)
        picTracker = 0;
    } else if (picTracker >= 0 && picTracker < array.length){
        console.log(`inside tracker checker! : tracker !== array.length`)
        picTracker++
        console.log(`tracker is now ${picTracker}`)
    }
}

//filter urls and only return those that are images hosted on reddit
const siftImages = (url) =>{
    console.log(`filter running on ${url}!`)
    if  (
        (url.includes(".jpg") || url.includes(".png")) 
        // &&
        // url.includes('i.redd.it')
    ) {  
        console.log('url passed!')
        return true
    } else {
        console.log('url rejected!')
        return false
    }
    
}

/////////////////////////////////
////Loaded DOM event and function
/////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    /////////////////////////////////////
    //submit button listener and function
    /////////////////////////////////////
    form.addEventListener("submit", (e) => {
    //don't let the page refresh!
    e.preventDefault()
    
    //Hide form and text
    title.style.display = "none"
    instructions.style.display = "none"
    form.style.display = "none"
    //reveal stop button and image
    stopButton.style.display = "grid"
    displayContainer.style.display = "block"
    stage.style.display = "block"
    //make alt relavent
    stage.alt = 'getting ' + input.value + ' pics...'
    ///////////////////
    //make fetch happen
    ///////////////////
    fetch(`${requestUrl}${input.value}`)
    ///when working add+input.value+"%20pictures")
    .then((responseData) => {
        //extract the JSON data from the fetch object
        return responseData.json()
    })
    .then((jsonData) => {
        console.log(jsonData.data)
        console.log(jsonData.data.children[0].data.url)
        
        //add images to array
        for (let i = 0; i < 25; i++) {
            //grab image url from json
            const imageUrl = jsonData.data.children[i].data.url
            pics[i] = `${imageUrl}`
            console.log(`captured image${i}: ${imageUrl}`)
        }
        //filter the array of urls from json
        console.log(`about to filter ${pics}`)
        filteredPics = pics.filter(siftImages)
        console.log(filteredPics)
        
        //begin the slideshow and set interval
        slideshow = setInterval(takeTheStage, 2000, filteredPics)
    
    })
    .catch((error)=>{
    console.log("ERROR")
    console.log("ERROR")})
    })
    //////////////////////////////////////
    /////Stop Button Listener and Function
    //////////////////////////////////////
    stopButton.addEventListener('click', () =>{
        console.log("stop clicked!")
        //reset variables 
        picTracker = 0
        pics = []
        filteredPics = []

        //stop slideshow
        clearInterval(slideshow)
        //hide image and clear src and alt
        displayContainer.style.display = "none"
        stage.style.display = "none"
        stage.src = "#"
        stage.alt = "#"
        //hide STOP and clear input
        stopButton.style.display = "none"
        input.value = ""
        //reveal text and form
        title.style.display = "block"
        instructions.style.display = "block"
        form.style.display = "block"
    })
})



