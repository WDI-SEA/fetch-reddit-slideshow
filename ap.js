const url = 'https://www.reddit.com/search.json?q='
const time = 1500
let slideshowInterval = null
let i = 0
document.addEventListener('DOMContentLoaded', () => {


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputValue = userInput.value
        form.remove()
        description.remove()
        title.remove()
    //    console.log(inputValue)
        fetch(url+inputValue+'&raw_json=1')
        .then(resData => {
           return resData.json()
        })
        .then(jsonData => {
            // console.log(jsonData.data.children)
            const dataResults = jsonData.data.children
            const imgUrls = dataResults.map(result=> {
                if(result.data.preview) {
                    return result.data.preview.images[0].source.url
                } else {
                    return 'no preview image'
                }
            })
            const filteredURLs = imgUrls.filter(url => {
                if(url == 'no preview image'){
                    return false
                } else {
                    return true
                }
            })
            const changeImg = () => {
              if(i < filteredURLs.length -1){
                slide.setAttribute('src', filteredURLs[i])
                i++
              } else {
                    i = 0;
              }
            }
            const slideShowInterval = setInterval(changeImg, time)
            const stopSlideshow = () => {clearInterval(slideShowInterval)}
            const stopbtn = document.createElement('button')
            stopbtn.textContent = 'stop'
            stopbtn.id = "stopButton"
            document.body.appendChild(stopbtn)
            // console.log(stopbtn);
            stopButton.addEventListener('click', () => {
                stopSlideshow()
            })
            show.appendChild(stopButton)
        })

        .catch(error=> {
            console.log(error)
        })
    })
})