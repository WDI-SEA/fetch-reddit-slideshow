const requestUrl = "https://www.reddit.com/search.json?q=" 
const stop = document.getElementById("stop")
let arrayURL = []
let newImage;
let pause = false;
// jsonData.data

document.addEventListener("DOMContentLoaded", () => {
    stop.addEventListener("click", stopButton)

    function stopButton() {
        pause = true;
      }

    form.addEventListener("submit", (e) => {

        e.preventDefault() //stop browser from refrshing
        // fetch data
        fetch(requestUrl + search.value)

        .then((responseData) => {
            //extract the JSON data from the fetch object
            console.log(responseData)

            return responseData.json()
        })

        .then((jsonData) => {
            // jsonData.data.children.forEach(getImage)
            //the above .then passed out returned json data into the cb
            console.log("JSON DATA:")
            console.log(jsonData.data)
            newImage = document.createElement("img")
            // jsonData.data.children.forEach(getImage)
            
                let i = 1;
                getImage(jsonData.data.children[0])

                const timed = setInterval(() => {
                    if (!pause) {
                   getImage(jsonData.data.children[i])
                   if (i === jsonData.data.children.length - 1) {
                       i = 0
                   } else {
                        i++
                   }
                }
                }, 3000)
                timed()
                
        })
        .catch((error) => {
            // if any error is sent back, you will have access to it here
            console.log("ERROR!!!!")
            console.log(error)
        })


    })

    const getImage = (imageObj) => {
        
        // arrayURL.push(imageObj.data.thumbnail)
        newImage.src = imageObj.data.thumbnail

        if (newImage.src.includes(".jpg")
        || newImage.src.includes(".png")
        || newImage.src.includes(".jpeg")) {

           imageList.appendChild(newImage)
        }

        }


    



})