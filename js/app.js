// document.addEventListener('DOMContentLoaded',() => {
//     //store constants
//     const requestUrl = 'https://www.reddit.com/search.json?q='
//     let form = document.querySelector('form')
//     let input = document.querySelector('input')
//     let searchResult = []
//     let images= []
    
//     //request data
//     form.addEventListener('submit', (event) => {
//         event.preventDefault()

//         let userInput = input.value

//         console.log(userInput)

//         fetch(requestUrl + userInput)
//             .then((res) => {
//                 return res.json()
//             })
//             .then((jsonData) => {
//                 images = jsonData.data.children
                
                
                
                

                
                


//                 console.log(searchResult)
//             })
//             .catch((err) => {
//                 console.log(err)
//                 return err
//             })
//     })

//     function addImg(arr){
//         arr.forEach((img) {
//             let img = document.createElement('img')
//             img.src = elem
//             body.appendChild(img)
//         })
//     }

// })


//let try this again lol

document.addEventListener('DOMContentLoaded', () => {
    //global variables
        const timerSpeed = 5000
        let slideshowInterval = null
        let images = []
        let imageIndex = 0
    //selectors
        const searchForm = document.querySelector('#form')
        const searchInput =document.querySelector('#input')
        const submitButton= document.querySelector('#submit')
        const stopButton = document.querySelector('#stop-button')
        const slideshowContainer = document.querySelector('#slideshow')

        searchForm.addEventListener('submit', fetchReddit)
        stopButton.addEventListener('click', stopSlideshow)
        stopButton.style.display = 'none'

    //functions

        function fetchReddit(e){
            e.preventDefault()
            console.log(searchInput.value)
            //fetch from reddit
            fetch('https://www.reddit.com/search.json?q=' + searchInput.value)
            //jsonify
                .then((res) => {
                    return res.json()
                })
                .then((jsonData) => {
                    // console.log(jsonData.data.children)
                    images = jsonData.data.children
                        .map(child => {
                            return{
                                url: child.data.url,
                                subreddit: child.data.subreddit
                                
                            }

                        })
                        .filter(image => {
                            const fileExtension = image.url.slice(-4)
                            if(fileExtension === '.jpg' || fileExtension === '.png'|| fileExtension === '.gif') return true
                            return false
                        })
                    console.log(images)
                    //set interval for slideshow
                    slideshowInterval = setInterval(changeSlide, timerSpeed)
                    stopButton.style.display = 'inline'
                    //invoke the slideshow callback
                    changeSlide()

                })
            //catch
                .catch((err) => {
                    console.log(err)
                    return err
                })
        }

        function changeSlide(){
            imageIndex ++
            if(imageIndex  >= images.length){
                imageIndex = 0
            }
            while(slideshowContainer.firstChild){
                slideshowContainer.removeChild(slideshowContainer.firstChild)
            }
            // console.log(images[imageIndex])
            const imageSlide = document.createElement('img')
            imageSlide.src = images[imageIndex].url
            imageSlide.alt = images[imageIndex].subreddit
            imageSlide.width = 400
            
            slideshowContainer.appendChild(imageSlide)

        }

        function stopSlideshow(){


        }


})