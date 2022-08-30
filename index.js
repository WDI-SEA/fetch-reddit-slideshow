document.addEventListener("DOMContentLoaded", ()=>{


const submitBtn = document.querySelector("#search")
const input = document.querySelector("input")
const form = document.querySelector("form")
const hideDiv = document.querySelector("#hide")
const results = document.querySelector("#results")
const body = document.querySelector("body")
// const options = {
//     headers: {
//         'Accept': 'application/json'
//     }


form.addEventListener('submit', e =>{
    e.preventDefault()
    const searchValue = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    hideDiv.getElementsByClassName.visibility = "hidden"
    console.log(input.value)
    // step1 -fetch
    fetch(searchValue)
    //  step 2 - jsonify data
     .then(response => {
        return response.json()
     })
    // step3 do something w json data
    .then(search => {
        // this works
         console.log(search.data.children)
        const imgContainer = document.createElement('div')
        const imgDisplay = document.createElement('img')
        const imgParent = search.data.children
        
        imgParent.forEach(result =>{
            const img = document.createElement('img')
            img.src = result.data.thumbnail
            results.appendChild(img)
        })
        })
    // step 4 handle errors - this works
    .catch(err => {
        console.warn(err)
        const pTag = document.createElement('p')
        pTag.innerText= "oops! Looks like an error! 😡"
})
})

// create img gallery
// display imngs



})




























