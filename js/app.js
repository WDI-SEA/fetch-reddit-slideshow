// request URL for reddit API
const requestUrl = 'https://www.reddit.com/search.json?raw_json=1&q='

// has the dom loaded?
document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded hello!')
    $('#myCarousel').carousel({
        interval: 5000,
        cycle: true
    });
    // submit listener
    form.addEventListener('submit', e => {
        // prevent submit from refreshing the screen
        e.preventDefault()
        //create an array to hold the photos
        // fetch the data
        fetch(requestUrl + input.value)
        .then( (responseData) => {
            return responseData.json()
        })
        .then( (jsonData) => {
            console.log('JSON DATA:')
            console.log(jsonData.data.children)
            jsonData.data.children.forEach(addPhoto)            
        })
        .catch( (error) => {
            console.log('ERROR:')
            console.log(error)
        })
    })
    
    let i = 0

    const addPhoto = redditObj => {
        if (redditObj.data.preview) {
            console.log(redditObj.data.preview.images[0].source.url)
            const slide = document.createElement('div')
            slide.setAttribute('class', 'carousel-item')
            if (i === 0) {
                slide.setAttribute('class', 'carousel-item active')
                i++
            }
            // WE ARE HAVING AN ISSUE: IF IMAGE DOESN'T EXIST PROCESS STOPS
            slide.innerHTML = `<img class="d-block w-100" src="${redditObj.data.preview.images[0].source.url}" alt="a photo">`
            //console.log(slide)
            const carouselBox = document.getElementById('carouselBox')
            carouselBox.appendChild(slide)
            //photoArray.push(redditObj.data.thumbnail)
        }
    }
})

