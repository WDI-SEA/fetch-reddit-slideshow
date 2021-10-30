const requestURL = 'https://www.reddit.com/search.json?q='
const initalPage = document.getElementById('container')
const submit = document.getElementById('submit')
const stopBtn = document.getElementById('stopBtn')
const slideshow = document.getElementById('slideshow')
let resultIndex = 0

document.addEventListener('DOMContentLoaded', () => {
    initalPage.style.display = 'block'
    slideshow.style.display = 'none'
    fetchRedditData()
})



const fetchRedditData = () => {
    // fetch related posts from reddit (with fetch)
    searchForm.addEventListener('submit', (e) => {
        // prevent default form submission 
        e.preventDefault()
        fetch(`${requestURL}${search.value}&limit=100`)
        .then((responseData) => {
            // verify that you can type something into the form
            // use AJAX to make a request. Show data in console
            console.log(responseData)
            return responseData.json()
        })
        .then((jsonData) => {
            // console.log('here is the json data\n', jsonData)
            // take jsonDATA and create an array of image URLs (use map and filter)
            const resultsArr = jsonData.data.children
            // console.log('this is the results array\n', resultsArr)
            const onlyURLs = resultsArr.map(getURLs = (list) => {
                return list.data.url
            })
            // console.log('just the image URLs\n', onlyURLs)
            const filteredImg = onlyURLs.filter(redditImg = (url) => {
                return url.includes('https://i.redd.it/')
            })
            console.log('these are the filtered urls\n', filteredImg)
            const changeSrc = () => {
                if (resultIndex < filteredImg.length) {
                    slideshow.setAttribute('src', filteredImg[resultIndex])
                    resultIndex++
                } else {
                    resultIndex = 0
                }
            }
            changeSrc()
            // Make the form / title / description hide
            slideshow.style.display = 'block'
            initalPage.style.display = 'none'
            // Cycle through images
            // tip: use setInterval
            const slideshowInterval = setInterval(changeSrc, 2000)
            // When the user clicks the "stop" button
            // Animation stops / images are removed
            const stopSlideshow = () => {clearInterval(slideshowInterval)}
            stopBtn.addEventListener('click', () => {
                stopSlideshow()
                // Form / title / description are shown again
                initalPage.style.display = 'block'
                slideshow.style.display = 'none'
            })
        })
        .catch((error) => {
            console.log(`there's been an error!\n,`, error)
        })
    })
}