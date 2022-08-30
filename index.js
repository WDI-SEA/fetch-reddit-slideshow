document.addEventListener("DOMContentLoaded", ()=>{


const submitBtn = document.querySelector("#search")
const input = document.querySelector("input")
const form = document.querySelector("form")
const hideDiv = document.querySelector("#hide")
const results = document.querySelector("#results")
const body = document.querySelector("body")

// hide search input field when search results are displayed
function hideInput(){
    let hideForm = document.getElementById("hide")
    if(hideForm.style.display === "none"){
        hideForm.style.display - "block"
    }else{
        hideForm.style.display = "none"
    }
    }


form.addEventListener('submit', e =>{
    e.preventDefault()
    hideInput()
    const searchValue = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    // step1 -fetch
    fetch(searchValue)
    //  step 2 - jsonify data
     .then(response => {
        return response.json()
     })
    // step3 do something w json data
    .then(search => {
        // this works
        // creates img gallery
        //  console.log(search.data.children)
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



// display images as slideshow
let slideIndex = 0
showSlides()

function showSlides() {
    let i
    let slides = document.querySelector('result.data.thumbnail')
    console.log(slides)
   for(let i=0; i < slides.length; i++ ){
       slides[i].style.display = "none"    
   }
   slideIndex++
   if(slideIndex > slides.lenght) {slideIndex =1}
   slides[slideIndex-1].style.dislay ="block"
  setTimeout(showSlides, 2000) //changes every 2 seconds
 }



})




























