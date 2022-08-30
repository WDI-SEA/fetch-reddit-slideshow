const form = document.querySelector('form')
const input = document.querySelector('#searchBar')
const sButton = document.querySelector('#searchButton')
const rButton = document.querySelector('#return')
const photoZone = document.querySelector('#photoContainer')
const title = document.querySelector('#title')

// allowing of toggle outside of scope.
let scopeReset = false

// stores photo
let photoArray = []

// searches and cycles through photos. at an interval of 3 seconds. 

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let search = input.value
    hideStart()
    fetch(`http://www.reddit.com/search.json?q=${search}`)
        .then(searchData => {
            return searchData.json()
        })
        .then(searchDataJson => {
            let children = searchDataJson.data.children
            children.forEach(photo => {
                if (photo.data.is_video === false && photo.data.domain === "i.redd.it") {
                    photoArray.push(photo.data.url)
                }
            })
            let photoNum = 0
            const photo = document.createElement('img')
            photo.src = photoArray[photoNum]
            photoZone.append(photo)
            const photoScroll = setInterval(() => {
                if (scopeReset) {
                    clearInterval(photoScroll)
                }
                clearPhoto()
                photoNum++
                photo.src = photoArray[photoNum]
                photoZone.append(photo)
                if (photoNum === photoArray.length -1) {
                    clearInterval(photoScroll)
                    showEnd()
                    clearPhoto()
                }
                
            }, 3000);
        })
        
    })

// hides ui


function hideStart() {
    clearPhoto()
    scopeReset = false
    input.value = ''
    input.style.display = 'none'
    title.style.display = 'none'
    sButton.style.display = 'none'
    rButton.style.display = 'flex'
}

// unhides ui

function showEnd() {
    input.style.display = 'block'
    title.style.display = 'block'
    sButton.style.display = 'block'
    rButton.style.display = 'none'
    photoArray = []
}

// clears photo from screen

function clearPhoto() {
    while (photoZone.firstChild) {
        photoZone.removeChild(photoZone.firstChild);
    }
}

rButton.addEventListener('click', () => {
    scopeReset = true
    photoArray = []
    clearPhoto()
    showEnd()
})