const requestURL = "http://www.reddit.com/search.json?q="
const limitChange = "&limit=100"
document.addEventListener("DOMContentLoaded", () => {
    let imageArray = []
    let title = document.getElementById("title")
    let greeting = document.getElementById("greeting")
    let stopButton = document.getElementById("stopButton")
    let isSearchActive = true
    let image = document.createElement("img")
    form.addEventListener('submit', (event) => {
        document.querySelector('.container').innerHTML = ""
        document.querySelector('.container').style.visibility = "visible"
        isSearchActive = true
        event.preventDefault()

        removeTitleFormSearchBox()
        fetch(requestURL+searchBox.value+limitChange)
            .then((responseData)=> {
                return responseData.json()
            })
            .then((jsonData) =>{
                for (let i = 0; i < 25; i++) {
                    imageArray.push(jsonData.data.children[i].data.url)
                }
                filteredArray = imageArray.filter(onlyReddit)
                document.querySelector('.container').appendChild(image)
                setInterval(slideShow, 1000);
            })
            .catch((runTimeError) => {
                console.log(runTimeError)
            })

            stopButton.addEventListener("click", stopButtonFunc)
            
    })

    
    counter = 0
    const slideShow = () => {
        if(counter<filteredArray.length-1 && isSearchActive){
            
            image.src = filteredArray[counter]
            counter++
        } else {
            counter = 0
        }
    }

    // function that hides the search box and other fies
    const removeTitleFormSearchBox = () => {
        title.style.visibility = "hidden"
        greeting.style.visibility = "hidden"
        document.getElementById("searchBox").style.visibility = "hidden"
        document.getElementById("submitButton").style.visibility = "hidden"
    }

    const stopButtonFunc = () => {
        greeting.style.visibility = "visible"
        title.style.visibility = "visible"
        document.getElementById("searchBox").style.visibility = "visible"
        document.getElementById("submitButton").style.visibility = "visible"
        isSearchActive = false;
        document.querySelector('.container').style.visibility = "hidden"
        filteredArray = []
    }

    
    


    const onlyReddit = (url) =>{
        return url.includes(".jpg") || url.includes(".png")
    } 
})