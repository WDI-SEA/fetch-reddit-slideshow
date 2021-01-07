let stop = document.querySelector("#stop")
let img = document.createElement("img")
document.getElementById("pictures").append(img)
let text = document.querySelector("#input")
let currentImages = []
let currentIndex = 0

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed')
    stop.style.display = "none"
    return getInput()
})

let reddit = "https://www.reddit.com/search.json?q="
document.getElementById("submit").addEventListener("click", e => {
    e.preventDefault()
    stop.style.display = "initial"
    img.style.display = "initial"
    getInput()
    remove()
    // setInterval(nextP, 3000)
    stop.addEventListener("click", ()=> {
        console.log("stop")
        img.style.display = "none"
        form.style.display = "initial"
        clearTimeout(nextP)
    })
    // nextP()
    
})
const getInput = () => {
    fetch(reddit + input.value)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //  really hard time with map function, getting filter to work is crazy not working
        currentImages = data.data.children.map(image => {
            return {
                thumbnail: image.data.thumbnail
            }
            
        })
        console.log(currentImages)
        img.src = currentImages[currentIndex].thumbnail
        console.log(img.src)
        setInterval(nextP, 4000)
       
        // document.getElementById("pictures").textContent = data.data.children[0].data.title
        // console.log(data.data.children[0].data.title)
        // document.getElementById("pictures").innerHTML = `<img src=${adat.data.children[0].data.thumbnail}>`
    })
    .catch(error => {
        console.log("Error is", error)
    })
    // placeImage()
}

function remove() {
    form.style.display = "none"
}

function nextP() {
        currentIndex++
    if (currentIndex >= 25) {
        currentIndex = 0
    } 
    img.src = currentImages[currentIndex].thumbnail
}



    // const changeImage = () => {
// console.log(currentImages)
//     // incremting index
//     currentIndex++
//     // checking bounds of array
//     if (currentIndex >= currentImages.length) {
//         currentIndex = 0
//     }
//     //  placing image
//     placeImage()
// }

// const placeImage = () => {
//     console.log("hi")
   
// }


// // changeImage()
// // function
// // .then((fetchedUseers) =>
// //         return fetchedUseers.json()
// //     })

// //     .then((jsonUsers) => {
// //         // jsonUsers.results.forEach(nextPicture)
// //         console.log(jsonUsers)
// //     })
//     .catch((err) => {
//         console.log("failed to fetch users!", err)
