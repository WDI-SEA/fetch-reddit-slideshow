const searchForm = document.querySelector("#searchForm")
const searchInput = document.querySelector("#searchInput")
const btn = document.querySelector("#btn")
const url = `http://www.reddit.com/search.json?q=`

// document.querySelector("#searchForm").addEventListener("submit", (e) => {
//     e.preventDefault()
// })
//prevent default form submission- can you type in form?


searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(searchInput.value)
    
    let newUrl = `http://www.reddit.com/search.json?q=${searchInput.value}`

    console.log(newUrl)
    // Fetch related post from reddit (with fetch)/ using fetch/ajax to make a request. show data in console
        
    fetch(newUrl)
        .then((rData) => {
            console.log('data here', rData)
            return rData.json()
        })

        .then((jsonData) => {
            console.log("here", jsonData)

            // use the above variable-- to filer and map arry for images
        })
        
    })


    
    //Display the slideshow of images (DOM manipulation)
    
    //show button to stop slide show--
    //1. animation stops and images are removed
    //2.form and title are shown again
//3. user can enter a new search term--redisplay

