console.log('fetchin reddit')

// let search = 'dogs'

const redditEndpoint = 'https://www.reddit.com/search.json?q='

let urls = []
let arrayLength = urls.length
let images = document.getElementById('images')
console.log(images)
let length = 0
let reset = document.getElementById('reset')
let interval = null

reddit.addEventListener('submit', (e)=>{
e.preventDefault()

fetch(redditEndpoint + e.target.searchBar.value)
.then((fetchObj)=>{
    console.log(fetchObj)
    return fetchObj.json()
})

.then((jsonData)=>{
    credentials = '.jpg'
    console.log(jsonData.data.children[0].data.thumbnail)
    console.log(jsonData.data.children[0].data.url)
    jsonData.data.children.forEach(picture => {
        urls.push(picture.data.thumbnail)
    });
    console.log(urls)
    switchPictures()
    // nextPicture()
    // images.src = urls[length]
    
})

.catch((error)=>{
    console.log(error)
})
})
// cycle through array numbers
// use ++ to change through array index
// set it on an interval
// update url to image source
// if else?
// make global variable to ++ everytime you call switchPictures
// image.src = urls[incrementor]
let switchPictures = () =>{
    interval = setInterval(nextPicture, 4000)
    console.log('switch pictures', switchPictures)
}

function nextPicture(){
    if (length <= 5){
        console.log(length)
        images.src = urls[length]
        length++
    } else{ 
        length = 0
    }
}

reset.addEventListener('click', e => {
    e.preventDefault
    images.src = ''
    document.getElementById('search').value = ''
    clearInterval(interval)
    urls = []
    length = 0
})



// for (let i = 0; i < arrayLength; i++) {
//     console.log(urls[i])
// }

// have event listener when you press search it gets keyword from text value and displays images

// have a time interval that slides through images

//event.target if you click on a button, button is target e.target()

// let myObject = {
//     keyOne: 'value one',
//     keyTwo: 'value two',
//     keyThree: ['pizza','steak','candy'],
//     keyFour: {
//         innerKeyOne: 'bob'
//     }
    
// }
// console.log(myObject.keyFour.innerKeyOne)


