const requestUrl = 'https://www.reddit.com/search.json?raw_json=1&q='

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded hello!')
    $("form").keypress(function(e){
        if(e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    })
    // submit listener
    form.addEventListener('submit', e => {
        // only proceed if the input has a value
        if (input.value != '') {
            // prevent submit from refreshing the screen
            e.preventDefault()
            // fetch the data
            fetch(requestUrl + input.value)
            .then( (responseData) => {
                return responseData.json()
            })
            .then( (jsonData) => {
                console.log('JSON DATA:')
                console.log(jsonData.data.children)
                // add a reset button to the page
                addReset()          
                // add photos to the carousel
                jsonData.data.children.forEach(addPhoto)  
            })
            .catch( (error) => {
                console.log('ERROR:')
                console.log(error)
            })
        }
    })
    
    let first = true

    const addPhoto = redditObj => {
        if (redditObj.data.preview) {
            console.log(redditObj.data.preview.images[0].source.url)
            const slide = document.createElement('div')
            slide.setAttribute('class', 'carousel-item')
            // this 'if' gives first photo the class "active" to trigger the start
            if (first) {
                slide.setAttribute('class', 'carousel-item active')
                first = false
            }
            // adds img html element to the slide div
            slide.innerHTML = `<img class="d-block" src="${redditObj.data.preview.images[0].source.url}" alt="a photo">`
            const carouselBox = document.getElementById('carouselBox')
            carouselBox.appendChild(slide)
        }
    }

    const addReset = () => {
        const reset = document.createElement('button')
        reset.setAttribute('id','reset')
        reset.setAttribute('class','btn btn-primary btn-lg btn-block')
        reset.setAttribute('type','button')
        input.setAttribute('class','d-none')
        instructions.setAttribute('class','d-none')
        reset.innerText = 'Reset'
        reset.addEventListener('click', resetPage)
        submit.setAttribute('class', 'd-none')
        form.appendChild(reset)
    }
    
    const resetPage = () => {
        console.log('reset clicked')
        submit.setAttribute('class', 'btn btn-primary btn-lg')
        input.setAttribute('class','form-control mt-2 mb-2')
        instructions.setAttribute('class','')
        form.removeChild(reset)
        carouselBox.innerHTML = ''
        input.value = ''
        first = true
    }
})

