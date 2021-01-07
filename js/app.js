const addImage = (image) => {
    // let peopleList = document.getElementById('peopleList')
    let newImage = document.createElement('li')
    newImage.textContent = image.source
    imageSlides.appendChild(newImage)
}

const randomSearchImage = 'http://www.reddit.com/search.json?q='

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (e)=>{
        
        e.preventDefault()

        fetch(randomSearchImage+input.value+'+nsfw:no')
        .then((fetchedImages)=>{
            return fetchedImages.json()
        })
        .then((jsonImages)=>{
            jsonImages.results.forEach(addPerson)
            // console.log(jsonUsers.result)
        })
        .catch((err)=>{
            console.log('Failed to fetch users', err)
        })
    })
})