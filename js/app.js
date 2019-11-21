let baseUrl = 'https://www.reddit.com/search.json?q='
let apiSearchURLImages = []



const displayShow = () => {
    console.log("displaying slideshow")
    //Grab the baseUrl + userInput, to fetch from the completed URL?
    fetch(baseUrl + userInput)
    .then(response => response.json())
    .then(data => {
        console.log('Success')
        console.log(data)
        //drill data down/filter image objects, grab keys ?
        //map new array of images ?
        // document.getElementById('redditImage').src = img from array of images
        
    })
    //Error handling
    .catch(err => {
        console.log('Error')
        console.log(err)
    })
    console.log('Fetch is over')
}
const fetchInput = () => {
    userInput = document.getElementById('userInput').value
    console.log(userInput)
    let apiSearchURL = baseUrl + userInput
     //hides the unnecessary stuff to prepare for slideshow
    document.getElementById('description').style.display = "none"
    document.getElementById('pageTitle').style.display = "none"
}

displayShow(0)

search.addEventListener('click', fetchInput)


//set interval to cycle reddit image
