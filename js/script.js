//TO DO: store pics an an auditons array, filter into pics

//universal variables
//track the picture on display
let picTracker = 0
//collect pictures from json
const pics = []
let filteredPics = []
//declare url for fetch
const requestUrl = "https://www.reddit.com/search.json?q="
//dom initializations
theHouse = document.getElementById('displayContainer')
const stage = document.getElementById('stage')
theHouse.appendChild(stage)


///////////////////////////
////////universal functions 
///////////////////////////

//hide the image on display, display next image in the queue 
const takeTheStage = (array) => {
    console.log(`tTS is working: tracker = ${picTracker}`)
    console.log(`need to Display array[${[picTracker]}] with ${array[picTracker]}`)
    const picToDisplay = array[picTracker]
    const picToRemove = array[picTracker - 1]
    console.log(`picToRemove= pics${picTracker - 1}`)
    stage.src = `${array[picTracker]}`

    if (picTracker === array.length) {
        console.log(`inside tracker checker!: tracker === array.length `)
        picTracker = 0;
    } else if (picTracker >= 0 && picTracker < array.length){
        console.log(`inside tracker checker! : tracker !== array.length`)
        picTracker++
        console.log(`tracker is now ${picTracker}`)
    }
}

////filter func
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

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        //make alt relavent
        stage.alt = input.value
        //make fetch happen
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
            console.log(`about to filter ${pics}`)
            filteredPics = pics.filter(siftImages)
            console.log(filteredPics)
            
            // setTimeout(takeTheStage, 2000, pics, picTracker)
            // setTimeout(takeTheStage, 4000, pics, picTracker)
            setInterval(takeTheStage, 2000, filteredPics)
        
        })
        .catch((error)=>{console.log("ERROR")
        console.log("ERROR")})
    })
})

///Google Fu
//////////////

//Json request url syntax
//https://www.reddit.com/search.json?q=fireworks%20images
//things to look for 

//data>children>data>url


