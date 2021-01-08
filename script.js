console.log("We good broskey!");
document.addEventListener('DOMContentLoaded', ()=>{
    console.log("seriously, bro we're good.")
})



const redditEndPoint = 'https://www.reddit.com/search.json?q=';

function search() {
    fetch(redditEndPoint+input.value)
    .then((fetchedImages)=>{
        return fetchedImages.json()
    })
    .then((jsonImages) => {
       jsonImages.results
    }) 
    .catch((err)=>{
        console.error('Failed to fetch image!', err)
    })
}

document.getElementById("submit").addEventListener("click", () => {
    search()
    console.log("I've been clicked.")
})
//let pictures = []
//let i = 0
//let count = null
//function slides() {
//}
//function start() {
//
//}
//
//function pause() {
//
//}

//function knockItOff() {
//    clearInterval(count)
//