
//select form input
let formInput = document.querySelector("#formInput")
let slideshowElem = document.querySelector("#slideshow")

//acess images

let resultImages
let slideshowInterval

function fetchReddit(e){
    e.preventDefault()
    //let value = "cats"
    console.log("input =>",formInput.value)

    fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nsfw:no`)
    .then(result => result.json())
    .then(results => {
        //console.log(results.data.children)
            resultImages = results.data.children.map(child => {
            return {
                url: child.data.url,
                title: child.data.title
            }
        })

        .filter(image => {
            let imgExtension = image.url.slice(-4)
            return imgExtension === ".jpg" || imgExtension === ".png"

        })
        console.log(resultImages)

        //slideshow(resultImages)
        let slideshowInterval = setInterval(() => {
            slideshow(resultImages)
        }, 3000)

    })

    .catch(console.warn)

}
//fetchReddit()

//slideshow function
let imgIndex = 0

function slideshow(resultImages) {
    console.log("imgs =>", resultImages)
    console.log("el =>", slideshowElem.src)
    //slideshowElem.src = imgArr[0].url
    if (imgIndex >= resultImages.length) {
        imgIndex = 0
    }
    slideshowElem.src = resultImages[imgIndex].url
    imgIndex = imgIndex + 1
}








let stopBtn = document.querySelector("#stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stopit")
    clearInterval(slideshowInterval)

})




let submitBtn = document.querySelector("#submitButton")
submitBtn.addEventListener("click", fetchReddit)







/*
document.querySelector("#catClick").addEventListener("click", function(){
    let fetchURL = "http://www.reddit.com/search.json?q=cats+nsfw:no"
    fetch(fetchURL)
    .then(function(response)
     {return response.json()
    })
    .then((res => {console.log(res.data.children)
     let resultImages = results.data.children.map[child => {
            return{
                url: child.data.url,
                title: child.data.title
            }))
    })
    .catch(console.warn)*/