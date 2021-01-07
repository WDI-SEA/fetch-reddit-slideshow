const randomSearchImage = 'http://www.reddit.com/search.json?q='

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (e)=>{
        
        e.preventDefault()

        fetch(randomSearchImage+input.value+'+nsfw:no')
        .then((fetchImages)=>{
            return fetchImages.json()
        })
        .then((jsonImages)=>{
            jsonImages.results.forEach(addImage)
            // console.log(jsonUsers.result)
        })
        .catch((err)=>{
            console.log('Failed to fetch users', err)
        })
    })
})