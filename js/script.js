const submitForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const mainContainer = document.querySelector("#main-container")
const slideshowContainer = document.querySelector("#slideshow-container")

submitForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetchRedditData(searchInput.value)
    // divToggler(mainContainer)
    // divToggler(slideshowContainer)
})

const fetchRedditData = (searchString) =>{
    const endpoint = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`
    // fetch requires the api url as arg
    // fetch(endpoint) // returns fetch object
    fetch(endpoint)
    .then(fetchObj=>fetchObj.json()) // implicitly returning the result of fetchObj.json()
    .then(jsonData=>{
        // console.log(jsonData.data.children)

        //displays all URLS - not all URLS are in image.  might be question for TA
        jsonData.data.children.forEach(element=>{
            console.log(element.data.url)
        })


        
    })
    .catch(err=>console.log('error fetching data',err))
}

function divToggler() {
    let x = document.querySelector("#main-container")
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
  }