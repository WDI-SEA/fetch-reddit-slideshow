let images = []
let image
const redditEndpoint = "https://www.reddit.com/search.json?q="
let cont = true
let time = 3000
let i = 0
let t


document.addEventListener("DOMContentLoaded",(e)=>{
    
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        // header.style.visibility = "hidden"
        for (let i=0; i<images.length;i++){
            images[i].pop()
        }
        fetch(redditEndpoint+input.value+"+nsfw:no")
        .then((fetchObj) =>{
            console.log("Here is the fetch object:", fetchObj)
            return fetchObj.json()
        })
        .then((jsonData) =>{
            jsonData.data.children.forEach(addImage)
            console.log("Here is the json Data:", jsonData)
        })
        .catch((error) =>{
            console.log("oh no, you did Not make fetch happen")
            console.log(error)
        })

    })
    
    const addImage = image => {
        if (!(image.data.is_video)){
            images.push(image.data.url)
        }
        displayImage() 
    }

    function displayImage() {
        document.slide.src = images[i]
        if (i < images.length-1){
            console.log(i)
            i++
        }else {
            i = 0
        }

        t = setTimeout(displayImage,time)
        
    }

    document.querySelector("button").addEventListener("click",(e)=>{
        clearTimeout(t)
        // header.style.visibility = "visibility"
        // images.style.visibility = "hidden"
    })
})