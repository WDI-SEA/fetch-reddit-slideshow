
const userInput = document.getElementById('input').value
let imageArray

const displayImage = () => {
    fetch(`https://www.reddit.com/search/?q=${userInput}`)
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<data.data.children.data.length; i++) {
            if (i === "thumbnail") {   //i used Thumbnail instead of URL to try and get around CORS issue, but that didnt work either
                imageArray.map([i.value])
            }
        }
        console.log("Success")
        document.getElementById('image').innerHTML = `<img src=${data.data.children[0].data.url}>`
    })
    .catch(err => {
        console.log('Error')
        console.log(err)
    })

    console.log('Fetch is over')
}

const imageRotation = () => {
    document.getElementById('image').setAttribute('src', imageArray[i])
    if (i < imageArray.length) {
        setTimeout(imageRotation, 3000)
    }
    imageArray[i]++
    
}

const removeForm = () => {
    var welcome = document.getElementById('welcome')
    var title = document.getElementById('title')
    var input = document.getElementById('input')
    welcome.parentNode.removeChild(welcome)
    title.parentNode.removeChild(title)
    input.parentNode.removeChild(input)
    
} 

const refresh = () => {
    document.getElementById('button').setAttribute('onClick', 'window.location.reload()')
}

const startSearch = (input) => {
    input = document.getElementById('input').value
    console.log(input)
    document.getElementById('button').textContent = "Back to Search"

    removeForm()
    refresh()
    displayImage()
    imageRotation()
}

document.getElementById('button').addEventListener('click', startSearch)



