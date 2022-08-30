const form = document.querySelector('form')
const input = document.querySelector('#searchBar')
const button = document.querySelector('button')
const photoZone = document.querySelector('#photoContainer')

let photoSlide = false

let photoArray = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let search = input.value
    input.value = ''
    input.style.display = 'none'
    button.innerText = 'END'
    photoSlide = true
    fetch(`http://www.reddit.com/search.json?q=${search}`)
        .then(searchData => {
            return searchData.json()
        })
        .then(searchDataJson => {
            let children = searchDataJson.data.children
            children.forEach(photo => {
                if (photo.data.is_video === false && photo.data.over_18 === false) {
                    photoArray.push(photo.data.url)
                }
            })
        })
    })

    function slidePhotos() {
        if (photoSlide) {
            for (let i = 0; i < photoArray.length; i++) {
                setInterval(() => {
                    
                }, 3000)

            }
        }
    }