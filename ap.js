const url = 'https://www.reddit.com/search.json?q='
const time = 2000
let slideshowInterval = null
let i = 0
document.addEventListener('DOMContentLoaded', () => {


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputValue = userInput.value
    //    console.log(inputValue)
        fetch(url+inputValue+'&raw_json=1')
        .then(resData => {
           return resData.json()
        })
        .then(jsonData => {
            // console.log(jsonData.data.children)
            const dataResults = jsonData.data.children
            const imgUrls = dataResults.map(result=> {
                if(result.data.preview) {
                    return result.data.preview.images[0].source.url
                } else {
                    return 'no preview image'
                }
            })
            const filteredURLs = imgUrls.filter(url => {
                if(url == 'no preview image'){
                    return false
                } else {
                    return true
                }
            })
            // console.log(imgUrls);
            // const filteredURLs =imgUrls.filter(url => {
            //     if(url.includes('jpg') || url.includes('.png')){
            //         return true
            //     } else {
            //         return false
            //     }
            // })


            // for(let i=0; i<imgUrls.length; i++){
            //     //create a new image element
            //     let redditPhoto = document.createElement('img')
            //     //add the src from the array
            //     redditPhoto.setAttribute('src', imgUrls[i])
            //     //append
            //     testImageList.appendChild(redditPhoto)
            // }
            // console.log(filteredURLs);
           

            // const changeScreen = () => {
            //     if(resultIndex < filteredURLs.length - 1){ 
            //         slideshow.setAttribute('src', filteredURLs([resultIndex]))
            //         resultIndex++
            //     } else {
            //         resultIndex = 0
            //     }
            // }
            const changeImg = () => {
              
                
                if(i < filteredURLs.length -1){
                    slide.setAttribute('src', filteredURLs[i])
                        i++
                    } else {
                        i = 0;
                    }
            }
            setInterval(changeImg, time)
        })
        .catch(error=> {
            console.log(error)

        })
    })
})