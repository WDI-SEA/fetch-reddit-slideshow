//universal variables
//declare url for fetch
const requestUrl = "https://www.reddit.com/search.json?q="


///////////////////////////
////////universal functions 
///////////////////////////

//hide the image on display, display next image in the queue 
const takeTheStage = (array, tracker) => {
    console.log(`tTS is working`)
    console.log(`need to Display ${array[tracker].id} with ${array[tracker].style.display.value}`)
    const picToDisplay = document.getElementById(`pic-${tracker}`)
    
    const picToRemove = document.getElementById(`pic-${tracker - 1}`)
    console.log(`picToRemove=${picToRemove.id}`)

    picToDisplay.style.display = "grid"
    picToRemove.style.display = "none"
    
    if (tracker === pics.length) {
        tracker = 0;
    } else if (tracker >= 0 && tracker < pics.length){
        tracker++
    }
}

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        //make fetch happen
        fetch(`${requestUrl}${input.value}%20pictures`)
        ///when working add+input.value+"%20pictures")
        .then((responseData) => {
            //extract the JSON data from the fetch object
            return responseData.json()
        })
        .then((jsonData) => {
            console.log(jsonData.data)
            console.log(jsonData.data.children[0].data.url)
            //track the picture on display
            const picTracker = 0
            //collect pictures from json
            const pics = []
            //add images to the webpage
            for (i = 0; i < 25; i++) {
                //grab image url from json
                const imageUrl = jsonData.data.children[i].data.url
                
                //only include urls that contain images
                if(imageUrl.includes(".jpg") || imageUrl.includes(".png")){  
                    console.log(`captured image${i}: ${imageUrl}`)
                    // create a div with json-returned image as the background
                    pics[i] = document.createElement('div')
                    pics[i].id = `pics-${i}`
                    pics[i].style.background = `url(${imageUrl})`
                    pics[i].style.backgroundSize = '300px auto'
                    pics[i].style.display = "none"
                    // append image to the html body
                    document.querySelector("body").appendChild(pics[i])
                    ///slideshow images
                    // console.log(pics[0].backround.value)
                    // const testPic = document.querySelector("pics-0")
                    // testPic.removeAttribute("display")
                    // testPic.style.display = "block"
                    takeTheStage(pics, picTracker)
            }
            
            
            
            
            
            // for (i = 0; i < pics.length; i++) {
            //     setInterval(() => {
            //         displayContainer.style.background = `pics${i}`
            //     })
            // }
            
            }
            
            // setTimeout(takeTheStage, 2000, pics, picTracker)
            // setTimeout(takeTheStage, 4000, pics, picTracker)
        
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


