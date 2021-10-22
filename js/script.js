// const requestUrl = "https://www.reddit.com/search.json?q=coffee+nsfw:no"

// what you can use to check if dom is loaded
document.addEventListener("DOMContentLoaded", () =>{
    searchForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        //fetch data from reddi
        const searchTerm = userInput.value.replaceAll(' ','+')
        fetch(`https://www.reddit.com/search.json?q=${searchTerm}&limit=100&raw_json=1`)
        .then((responseData)=>{
            return responseData.json()

        })
        .then((jsonData)=>{
            console.log(jsonData)
            const resultsArray = jsonData.data.children
            //returns an array of just image urls 
            const imgURLs = resultsArray.map((resultObj)=>{
                //only returning data with preview image
                if(resultObj.data.preview){
                return resultObj.data.preview.images[0].source.url
                } else {
                    return 'no preview image'
                }
            })
            const filteredURLs = imgURLs.filter((url)=>{
                if(url==='no preview image') {
                    return false
                }else{
                    return true
                }

                })
            //         console.log(`LOOK:${url}`)
            //         return url
            //     }else{
            //         return false
            //     }
            // })
            console.log(filteredURLs)
            for(let i=0; i<imgURLs.length; i++) {
                //create a new img element
                let redditPhoto = document.createElement("img")
            //add the src from array
            redditPhoto.setAttribute('src', imgURLs[i])
            //append img to dom
            testImagesList.appendChild(redditPhoto)
            }
            console.log(imgURLs)
            //do whatever we need to do with the data
            // console.log(json.data.children)
        })
        .catch((error)=>{
            // console.log('error retriving data')
            // console.log(error)
        })
    })
    console.log('the dom has loaded')
})



