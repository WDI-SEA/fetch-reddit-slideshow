window.addEventListener('DOMContentLoaded', () => {

    //DOM SELECTORS
    let inputForm = document.querySelector("#search")
    let inputSearch = document.querySelector("#search-input")
    let submitBtn = document.querySelector("#submit")
    let slideshow = document.querySelector("#slideshow")
    let stopBtn = document.querySelector("#stop")
    let message = document.querySelector("#message")

    //Variables used 
    //store constant url for form dom element; request url
    let INTERVAL_DELAY = 3000
    let imageContainer = []
    let index = 0
    let interval

    //Display Shown
    inputForm.style.display = 'flex'
    message.style.display = 'flex'
    slideshow.style.display = 'none'
    stopBtn.style.display = 'none'

    // EVENT LISTENERS
    function submitForm(event){
        event.preventDefault()
    }

    inputForm.addEventListener('submit', submitForm);


    submitBtn.addEventListener('click', () => {
        inputForm.style.display = 'none'
        message.style.display = 'none'
        slideshow.style.display = 'flex'
        stopBtn.style.display = 'flex'
        imageFetch()

    })

    stopBtn.addEventListener('click', () => {
       reset()
    })
  
    function reset(){
        inputForm.style.display = 'flex'
        slideshow.style.display = 'none'
        stopBtn.style.display = 'none'
        clearInterval(interval)

    }

    function showImage(){
        slideshow.innerHTML = ''
        let newImage = document.createElement('img')
        newImage.src = imageContainer[index].url
        newImage.style.width = '300px'
        newImage.style.height = 'auto'

        slideshow.append(newImage)
    }

    function nextSlide() {
        index++

        if(index >= imageContainer.length) {
            index = 0
        }
        showImage()
    }

    async function imageFetch() {
        try{
            let imageSearch = await fetch(`http://www.reddit.com/search.json?nsfw:no&q=${inputSearch.value}`)
            let imageSearchJson = await imageSearch.json()
            let imageJsonResults = imageSearchJson.data.children
            imageContainer = imageJsonResults.map(function(post){
                return {
                    subreddit: post.data.subreddit,
                    title: post.data.title,
                    url: post.data.url
                }
            })
            .filter(function(result) {
                return result.url.includes('i.imgur') || result.url.includes('i.redd')
            })  
            showImage()
    
            clearInterval(interval)
    
            interval = setInterval(nextSlide, INTERVAL_DELAY)
        }catch(error){
            console.log(error)
        }

    }
})


        
