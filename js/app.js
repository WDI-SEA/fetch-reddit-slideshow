//const API_URL = 'https://www.reddit.com/search.json?nsfw=no&q='
//const INTERVAL_DELAY = 1000

let interval, postsWithImage
let searchInput = document.getElementById('query')
let searchArea = document.getElementById('search')
let slideshowArea = document.getElementById('slideshow')
let imageLoopCounter = 0

const removeSpaces = (arr) => {

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === " "){
        arr[i] = "%20"
      }
    }
    return arr.join('')
  }



const userSearch = (e) => {
    e.preventDefault() //prevents form from automatically refreshing the page

    //Check that something has been typed in
    if (searchInput.value) {

        let urlUserInput = searchInput.value

        //IF INPUT HAS SPACES: loop through characters and replace spaces with "%20"
        if (searchInput.value.includes(' ')) {
          let inputValueArray = searchInput.value.split('')
          urlUserInput = removeSpaces(inputValueArray)
        }
        //Hide form / title / description & unhide slideshow div
        searchArea.style.display = "none"
        slideshowArea.style.display = "flex"
        let header = document.createElement('p')
        slideshowArea.appendChild(header)
        header = document.getElementsByTagName('p')[1].textContent = `${searchInput.value}`

        //Put searchInput.value into the api url
        let apiURL = `https://www.reddit.com/search.json?q=${urlUserInput}+nsfw:no`
        console.log(apiURL)

       
        //Fetch the apiURl
        fetch(apiURL)
        .then(response => response.json())    //translates JSON into javascript object
        .then(data => { 
            
            //remove loading message
            //document.getElementsByTagName('body').removeChild(document.getElementsByTagName('p')[0])

            //find image, loop through and display on page at interval
            createImages(data)
            interval = setInterval(showImage, 1000)
           

        })
        .catch(err => {
            console.log('error', err)
        })

        //Show Loading Message (optional)
        // let loadingMessage = document.createElement('p')
        // loadingMessage.textContent = "LOADING..."
        // document.getElementsByTagName('body').appendChild(loadingMessage)
        
    }
    else {
        console.log('error')
        //showErrorMessage()
    }

}

//const showErrorMessage = () => {

//}

const showImage = () => {
    //to get around delay of first image, set first image

    console.log(imageLoopCounter)
    //make sure slideshow repeats until stop button pressed
    if (imageLoopCounter === postsWithImage.length-1) {
        document.getElementById(`${imageLoopCounter-1}`).style.display = "none"
        document.getElementById(`${imageLoopCounter}`).style.display = "block"
        imageLoopCounter = 0
    }
    else if (imageLoopCounter === 0) {
        document.getElementById(`${postsWithImage.length-1}`).style.display = "none"
        document.getElementById(`${imageLoopCounter}`).style.display = "block"
        imageLoopCounter++
    } 
    else {
        document.getElementById(`${imageLoopCounter-1}`).style.display = "none"
        document.getElementById(`${imageLoopCounter}`).style.display = "block"
        imageLoopCounter++
}
}


const createImages = (data) => {
    let posts = data.data.children
    //pair down object to what I want (can do more than image)
    // posts = posts.map(p => {
    //     return {
    //         title: p.data.url,
    //         subreddit: p.data.subreddit,
    //         upvotes: p.data.ups,
    //         gold: p.data.gilded > 0 ? true : false
    //         post_hint: p.data.post_hint
    //     }
    // }).filter(p => {
    //     return p.posthint === 'image'
    // })

    //could have reused posts and reassigned it here
    postsWithImage = posts.filter(post => post.data.thumbnail.includes('http'))
    


    for (let i = 0; i < postsWithImage.length; i++) {
        let thumbnail = postsWithImage[i].data.thumbnail
        let newImage = document.createElement("img")
        //if using code with object w/ more info could do this:
        // newImage.src = postsWithImage[imageLoopCounter].url
        // newImage.alt = postsWithImage[imageLoopCounter].title
        document.getElementById('images').appendChild(newImage).setAttribute('id', `${i}`)
        document.getElementById(`${i}`).setAttribute('src', thumbnail)
        document.getElementById(`${i}`).style.display = "none"
        }
}

const resetSearch = () => {
    //clear interval
    clearInterval(interval)

    //hide current image showing
    document.getElementById(`${imageLoopCounter-1}`).style.display = "none"

    //hide slideshow div
    slideshowArea.style.display = "none"

    //show search div
    searchArea.style.display = "flex"

    //clear search input
    searchInput.value = ""
}


//DECLARE EVENT LISTENERS
//form submit event listener ("e" parameter will refer to the submit event)
//document.getElementById('search-form').addEventListener('submit', e => {
    //e.preventDefault() //prevents form from automatically refreshing the page

    //get user input from text box
    //let userQuery = document.getElementById('query').value
//})

//Search Button/form submit
document.getElementById('search-form').addEventListener('submit', userSearch)

//stop button on click clears interval, clears slideshow and resets to search page
document.getElementById('stop-button').addEventListener('click', resetSearch)