document.addEventListener("DOMContentLoaded", () => {
    // http://www.reddit.com/search.json?q=cats+nsfw:no
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault() // This will stop the browser from refreshing
        console.log(e.target[0].value)
        const category = e.target[0].value
        // console.log(input.value)
        const requestURL = `https://www.reddit.com/search.json?q=${category}+nsfw:no`
        // fetch data
        fetch(requestURL)
        .then((responseData)=> {
            return responseData.json()
        })
        .then((jsonData)=> {
            let urlArray = []
            console.log(jsonData)
            // a shortcut to access the children that are stored in an array
            const results = jsonData.data.children
            // Using forEach which allows me to grab each of those results
            results.forEach((links)=>{
            // forEach of these boxes
            urlArray.push(links.data.url)
            // I have an array and I want stuff inside of it and what I want is the data.url thats in each of these boxes
            // I have the results box which is taking the date that is putting it into a url box
            // sorting through the data and taking the things that I want to see
            console.log(urlArray)
            })

            // filtering the urlArray
            const onlyImages = urlArray.filter((images)=>{
                if(images.includes(".jpg")){
                    return images
                }
            })
            const filterArray = urlArray.filter(onlyImages)
            console.log(filterArray)
        })
        .catch((error)=>{
            console.log('Oh no, there has been an error', error)
        })

    })

})