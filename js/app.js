// request URL for reddit API
const requestUrl = 'https://www.reddit.com/search.json?q='

// has the dom loaded?
document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded hello!')
    let photoArray = []
    // submit listener
    form.addEventListener('submit', e => {
        // prevent submit from refreshing the screen
        e.preventDefault()
        testList.innerText = ''
        //create an array to hold the photos
        // fetch the data
        fetch(requestUrl + input.value)
        .then( (responseData) => {
            return responseData.json()
        })
        .then( (jsonData) => {
            console.log('JSON DATA:')
            console.log(jsonData.data.children)
            photoArray = []
            jsonData.data.children.forEach(addPhoto)
            console.log(photoArray)
            
        })
        .catch( (error) => {
            console.log('ERROR:')
            console.log(error)
        })
    })
    
    const addPhoto = redditObj => {
        const li = document.createElement('li')
        li.innerHTML = `<img src="${redditObj.data.thumbnail}">`
        testList.appendChild(li)
        //photoArray.push(redditObj.data.thumbnail)
    }
})

