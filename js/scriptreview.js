console.log("hello")
//fetch
//triggerd by submission of form
//prevent default
// fetch .then .catch

//sellect form input
let formInput = document.querySelector("#formInput")
let slideshowEl = document.querySelector("#slideshow")

//access the images globally 
let resultImages

function fetchReddit(e) {
e.preventDefault()
//placeholdervalue - hard coded- but later we will use input-- later we will capture by form
// let value = "dogs"
console.log("target =>", formInput.value)
fetch(`http://www.reddit.com/search.json?q=${formInput.value}+nfsw:no`)
    .then(result => result.json())
    .then(results => { 
        // console.log(results)
        let resultImages = results.data.children.map(child => {
            return{
                url: child.data.url,
                title: child.data.title
            }
        })
        //filterout bad results
        .filter(image => {
            let imgExtenstion = image.url.slice(-4)
            return imgExtenstion === ".jpg" || imgExtenstion === ".png"
        })
        console.log(resultImages)
        slideshow(resultImages)
        let slideshowInterval = setinterval(() => {
            slideshow(resultImages)
        }, 1000)// 1000 for testing 
    })
    .catch(console.warn)

}
//fetchReddit()//used for testing 

//slide show function
function slideshow(imgArr) {
    console.log("images=>", imgArr)
    console.log("el=>", slideshowEl.src)
    //slideshowEl.src = imgArr[0].url
let imgIndex = 0
    
    if(imgIndex >= imgArr.length) {
        imgIndex = 0
    }
slideshowEl.src = img[imgIndex].url
imgIndex = imgIndex + 1
}

//intervals used by multiple functions need to be declared

//select DOM elemnts save to variables
//create event listeners

let stopBtn = document.querySelector("#stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
    clearInterval
})

let submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener("click", fetchReddit)