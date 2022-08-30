const form = document.querySelector('form')
const input = document.querySelector('#searchBar')
const button = document.querySelector('button')
const photoZone = document.querySelector('#photoContainer')
const title = document.querySelector('#title')


let photoArray = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let search = input.value
    input.value = ''
    input.style.display = 'none'
    button.innerText = 'END'
    title.style.display = 'none'
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
        slidePhotos()
    })

    function slidePhotos() {
            photoArray.forEach(photo => {
                let i = 0
                setInterval(() => {
                    const image = document.createElement('img')
                    image.src = photo[i]
                    photoZone.append(image)
                    i++
                }, 3000);
            })
        }
