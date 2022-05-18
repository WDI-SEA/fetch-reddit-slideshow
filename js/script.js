/*
===== FUNCTIONS =====
// domcontentloaded (event listeners)
// render (set DOM and page elements)
// timer
// change picture
// stop timer & changing picture
// fetch images
*/
/*
===== DOM CONTENT VARIABLES =====
// form 
// stop button
// image
// interval object
// fetched image array
*/
let form;
let stopBtn;
let imgEl;
let images = []

const render = () => {
    console.log("render invoked")
    // select form
    form = document.querySelector("#form")
    // set form display to block
    form.style.display = "block"
    // set form input value to string
    // helpful when we invoke render after fetching
    // console.log(form.search.value, 'search from form')
    form.search.value = ""
    // select img
    imgEl = document.querySelector("#img")
    // set img display to none
    //imgEl.style.display = "none"
}

const stopFetch = () => {
    console.log("stop the fetch")
    // clear interval timer
    // invoke render function
}

const formHandleSubmit = (event) => {
    // pass event object
    // prevent default form behavior
    event.preventDefault()
    console.log("form submitted")
    // save target search value to variable
    const searchTerm = event.target.search.value
    // console.log(searchTerm, 'search word entered')
    // interpolate search variable into url
    const url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`
    // console.log(url, 'url variable')
    // pass url variable as param in invocation of reddit fetch function
    redditFetch(url)
    // set form style display to none
    let formBox = document.querySelector("#form-container")
    formBox.style.display = "none"
}

const redditFetch = (urlParam) => {
    console.log("reddit fetching")
    // console.log(urlParam)
    // set header options
    const options = {
        headers: {
            "Accept": "application/json"
        }
    }
    // invoke fetch
    fetch(urlParam, options)
    // promise: jsonify response
    .then(response => response.json())
    // promise: map & filter jsonified data to images array
    .then(jsonData => {
        // console.log(jsonData.data.children, 'data in promise')
        images = jsonData.data.children
        .map(imageChild => {
            return {
                title: imageChild.data.title,
                url: imageChild.data.url
            }
        })
        // console.log(images, 'images after map')
        .filter(imageChild => imageChild.url.slice(-4) === ".jpg" || imageChild.url.slice(-4) === ".png")
        console.log(images, 'images after filter')
    })
    // promise: set interval to change img element src, select from images array
    // catch errors like good devs
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded")
    // invoke render function
    render()
    // add event listener to form (form handle submit)
    form = document.querySelector("#form").addEventListener("submit", formHandleSubmit)
    // add event listener to stop button (stop fetch)
    stopBtn = document.querySelector("#btn-stop").addEventListener("click", stopFetch)
})