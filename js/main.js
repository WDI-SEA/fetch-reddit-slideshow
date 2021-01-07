let images = []
let image
const redditEndpoint = "https://www.reddit.com/search.json?q="
let time = 3000
let t


document.addEventListener("DOMContentLoaded",(e)=>{
    
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        header.style.visibility = "hidden"
        for (let i=0; i<images.length;i++){
            console.log(images.length)
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
            startSlideShow()
        })
        .catch((error) =>{
            console.log("oh no, you did Not make fetch happen")
            console.log(error)
        })

    })
    
    const addImage = image => {
        if ((image.data.url.includes("png")) || (image.data.url.includes("jpg"))){
        // if ((image.data.post_hint === "image")){
            images.push(image.data.url)
        }
        console.log("1")
    }

    function startSlideShow() {
        
        document.getElementById("img").style.visibility = "visible"
        document.getElementById("footer").style.visibility = "visible"
        document.getElementById("img").src = images[0]
        let i= 1
        
        t = setInterval(()=>{
            document.getElementById("img").src = images[i]
            i++
        },time)
        
    }

    document.querySelector("button").addEventListener("click",(e)=>{
        clearInterval(t)
        console.log("enter")
        header.style.visibility = "visible"
        img.style.visibility = "hidden"
        document.getElementById("footer").style.visibility = "hidden"
    })
})