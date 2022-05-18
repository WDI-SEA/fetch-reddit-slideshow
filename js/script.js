const submitButton = document.querySelector('#form')
const clearBtn = document.querySelector('#clear')
const imgContainer = document.querySelector('#img-container')
const userInput = document.querySelector('#user-input')
const image = document.querySelector('img')
let imgUrlArr = []
let l = 0
let startSlideshow
// const redditUrl = `http://www.reddit.com/search.json?q=${userInput.value}+nsfw:no`

document.addEventListener('DOMContentLoaded', () => {
    submitButton.addEventListener('submit', (e) => {
        e.preventDefault()
        const redditUrl = `http://www.reddit.com/search.json?q=${userInput.value}+nsfw:no&limit=333`
        fetch(redditUrl)
        .then(responseData => responseData.json())
        .then(jsonData => {
            imgUrlArr = jsonData.data.children
            imgUrlArr = imgUrlArr.filter((i) => {
                return i.data.post_hint === 'image'
            })
            // console.log(imgUrlArr)
            imgUrlArr = imgUrlArr.map((j)=> {
                console.log(j.data.url)
                return j.data.url
            })
        }) 
        startSlideshow = setInterval(() => {
            image.src = imgUrlArr[l]
            l++
            if(l >= imgUrlArr.length){
                l = 0
            }
        }, 2000)
        submitButton.classList.add('#hidden')
        })
clearBtn.addEventListener('click', () => {
    clearInterval(startSlideshow)

})
    })

// fetch(redditUrl)
// .then(console.log)



// const picUrl = 'http://www.reddit.com/search.json?q=cats+nsfw:no'

// const options = {
//     headers: {
//         Accept: 'application/json'
//     }
// }

// fetch(picUrl, options)
//     .then(response => response.json())
//     // .then(console.log)
//     .catch(console.warn)

// document.addEventListener('DOMContentLoaded', () => {
//     const picContainer = document.querySelector('#pic-container')
//     const picButton = document.querySelector('#pic-button')

//     picButton.addEventListener('click', () => {
//         // fetch a joke from the joke api
//         fetch(picUrl, options)
//             // un-jsonify the data
//             .then(response => response.json())
//             .then(picData => {
//                 while(picContainer.firstChild) {
//                     picContainer.removeChild(picContainer.firstChild)
//                 }
//                 const p = document.createElement('p')
//                 // set the text of the p tag to be the joke
//                 p.innerText = picData.pic
//                 // append the p tag to the joke container
//                 picContainer.append(p)
//                 // make a fetch request and return it from this .then
//                 // const imageUrl = `https://icanhazdadjoke.com/j/${jokeData.id}.png`
//                 // const image = new Image()
//                 // image.src = imageUrl
//                 // image.alt = picData.pic
//                 // picContainer.append(image)
//             })
//             // catch our errors
//             .catch(err => console.warn('help', err))
//     })
// })