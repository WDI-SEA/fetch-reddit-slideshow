const thingsBeingSearched = document.getElementById('thingsSearchedAbout')
const searchBar = document.getElementById('searchBar')
const SubmitButton = document.getElementById('SubmitButton')
const title = document.getElementById('title')
const imageArray = []
const slideIndex = 0

//Request for the API
const requestUrl = "https://www.reddit.com/search.json?q="

document.addEventListener('DOMContentLoaded', () => {
    
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(requestUrl + searchBar.value)
        .then((responseData) => {
            // console.log('respond data', responeData)
            return responseData.json()
        })
        .then((jsonData) => {
            jsonData.data.children.forEach(imagesSearched)
            for (i = 0; i < 10; i++) {
                imageArray.push(jsonData.data.children[i].data.url_overridden_by_dest)
            }
            console.log(imageArray) 
            hideTheForm()
        .catch((error) => {
                console.log('ERROR!')
                console.log(error)
            })
        })
    })

    const imagesSearched = (thingSearched) => {
        const divImages = document.createElement('div')
        const createdImage = document.createElement('img')
        createdImage.src = thingSearched.data.url_overridden_by_dest
        //if image doesnt show up, this is alt text of the post name of that image
        createdImage.alt = thingSearched.data.title
        if (createdImage.src.includes("https://i.redd.it/") 
        || createdImage.src.includes(".jpg") 
        || createdImage.src.includes(".png") 
        || createdImage.src.includes(".jpeg")) {
            divImages.appendChild(createdImage)            
        }
        thingsSearchedAbout.appendChild(divImages) 
        // const showSlides = () => {
        //     const i = 0
        //     const slides = createdImage.src + createdImage.alt
            
        // }
    }



    function hideTheForm () {
        if (imageArray.length == 10) {
            searchBar.style.display = "none"
            SubmitButton.type = "hidden"
            title.innerHTML = ' '
        }
    }

    // const stopEverything = () => {
    //     imageArray = []
    //     searchBar.style.display = true
    //     SubmitButton.type = 'submit'
    //     title.innerHTML = ' <h1>View a Reddit SlideShow</h1>\n <h3>Search images about anything from Reddit and itll be shown as a SlideShow</h3>'
    // }

    // document.addEventListener('click', stopEverything)
})

