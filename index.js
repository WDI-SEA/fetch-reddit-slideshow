document.addEventListener("DOMContentLoaded", ()=>{


const submitBtn = document.querySelector("#search")
const input = document.querySelector("input")
const form = document.querySelector("form")
const hideDiv = document.querySelector("#hide")
const results = document.querySelector("#results")
const body = document.querySelector("body")
const options = {
    headers: {
        'Accept': 'application/json'
    }
}

form.addEventListener('submit', e =>{
    e.preventDefault()
    const searchValue = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    hideDiv.getElementsByClassName.visibility = "hidden"
    console.log(input.value)
    // step1 -fetch
    fetch(searchValue, options)
    //  step 2 - jsonify data
     .then(response => {
        return response.json()
     })
    // step3 do something w json data
    .then(search => {
        // console.log(search.data.children)
        const img = search.data.children
        console.log(img[0].data.thumbnail)
    
    })
    // step 4 handle erroes
    .catch(err => {
        console.warn(err)
})
})
})

// create img gallery
// display imngs


























