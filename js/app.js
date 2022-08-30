const form = document.querySelector('form')
const input = document.querySelector('#searchBar')
const sButton = document.querySelector('#searchButton')
const rButton = document.querySelector('#return')
const photoZone = document.querySelector('#photoContainer')
const title = document.querySelector('#title')



let photoArray = []

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
                while (photoZone.firstChild) {
                    photoZone.removeChild(photoZone.firstChild);
                }
                if (photoNum === photoArray.length -1) {
                    clearInterval(photoScroll)
                    showEnd()
                }
                photoNum++
                photo.src = photoArray[photoNum]
                photoZone.append(photo)
                
            }, 5000);
        })

    })

function hideStart() {
    input.value = ''
    input.style.display = 'none'
    title.style.display = 'none'
    sButton.style.display = 'none'
    rButton.style.displey = 'block'
}

function showEnd() {
    input.style.display = 'flex'
    title.style.display = 'flex'
    sButton.style.display = 'flex'
    rButton.style.displey = 'none'
}
