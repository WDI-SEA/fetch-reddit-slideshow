const randomSearchImage = 'http://www.reddit.com/search.json?q='

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (e)=>{
        
        e.preventDefault()
        console.log(inputField.value)

        fetch(randomSearchImage+inputField.value+'+nsfw:no')
        .then((fetchImages)=>{
            let jsonData = fetchImages.json()
            console.log(jsonData)
            return jsonData
        })
        .then((jsonImages)=>{
            // grab image thumbnail of each array item
            // add for loop in ind.
            for (let i=0; i<10; i++){
                let results = jsonImages.data.children[i].data.thumbnail
                console.log(results)
            }
        })
        .catch((err)=>{
            console.log('Failed to fetch users', err)
        })
    })
})

