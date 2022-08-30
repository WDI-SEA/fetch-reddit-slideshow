
// my code below!!

// document.addEventListener('DOMContentLoaded', e => {

//     const stopBtn = document.querySelector('#stop-button')
//     const searchForm = document.querySelector('#search-form')
//     const searchBtn = document.querySelector('#search-button')
//     const searchInput = document.querySelector('#search-input')
//     const body = document.querySelector('body')
//     let imagesArray = []
//     let index = 0
    
//     function displayPhoto() {

//     }
    

//     searchForm.addEventListener('submit', function(e) {
//         e.preventDefault()
//         searchBtn.classList.add('hidden')
//         searchInput.classList.add('hidden')
//         searchForm.classList.add('hidden')
//         stopBtn.classList.remove('hidden')
//         let searchVal = searchInput.value
//         const redditUrl = `http://www.reddit.com/search.json?q=${searchVal}`
//         console.log(redditUrl)
//         fetch(redditUrl)
//             .then(redData => {
//                 return redData.json()
//             })
//             .then(redJson => {
//                 console.log(redJson)
//                 // redJson.results.forEach(result => {
//                 redJson.data.children.forEach(childResult => {
//                     imagesArray.push(childResult.data.thumbnail)
//                     console.log(imagesArray) 
                    
//                     function displayPhoto() {
//                         let img = document.createElement('img')
//                         img.src = imagesArray[index]
//                         body.append(img)
                        
//                     }

//                     function displayInterval() {
//                         interval = setInterval(displayPhoto, 1000)
//                     }
//                     index = index + 1
//                 })

//                     console.log(redJson.data.children[1].data.gallery_data.items[0])
//                     // img.src = result.children
//                 // })
//             })
//     })









//     stopBtn.addEventListener('click', function(e) {
//         searchBtn.classList.remove('hidden')
//         searchInput.classList.remove('hidden')
//         searchForm.classList.remove('hidden')
//         stopBtn.classList.add('hidden')
//     })
    

// })

//class code below!!

