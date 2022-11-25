//globals
let searchTerm = ['']
let images = []
let imagesIndex = 0
let setLoop
// div for the initial section
const initial = document.querySelector('#initial')
// parent div for screen that displays images
const imageDiv = document.querySelector('#images')
// get h2 on page
const getTitle = document.createElement("h2")
// get header on page
const getHeaderId = document.getElementById("header")

//  This section is the initial landing page, it creates the user input and submit button
//  this section is deleted when a user submits their search 
function initialScreen() {
    window.scrollTo(0,0);
    const br = document.createElement("br")

    getTitle.innerHTML = "Image search"
    getHeaderId.appendChild(getTitle)

    const newForm = document.createElement("form")
    newForm.setAttribute("method","post")
    newForm.setAttribute("action", "submit" )
    newForm.setAttribute("id", "form" )

    const inputContent = document.createElement("input")
    inputContent.setAttribute("type","text")
    inputContent.setAttribute("id","searchText")
    inputContent.setAttribute("placeholder","enter the animal you want to search for ...")

    const setSubmitButton = document.createElement("button")
    setSubmitButton.setAttribute("type","button")
    setSubmitButton.setAttribute("id", "searchButton")

    newForm.appendChild(inputContent)
    newForm.appendChild(br.cloneNode())
    newForm.appendChild(setSubmitButton)

    document.getElementById("initial").appendChild(newForm)

    const getSubmitButton = document.getElementById("searchButton")
    getSubmitButton.innerText = 'search'

    const getSearchTextBox = document.getElementById("searchText")
    
    getSearchTextBox.addEventListener('keypress', function(event){
        if (event.key === 'Enter' ){
            submitSearch()
        }
    })

    getSubmitButton.addEventListener('click', submitSearch)

}

// sets the initial landing page
initialScreen()


//snippet to clear all child nodes from https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// get images from reddit search and puts it in an array
function getImage() {
    getTitle.innerText = `Search results for ${searchTerm}`
    const requestUrl = `https://www.reddit.com/search.json?q=${searchTerm[0]}+nsfw:no`
    const options = {
        method:  'GET',
        headers: {
            Accept: 'application/json'
        }
    }
    fetch(requestUrl, options)
        .then(res => res.json())
        .then(res => {
            //stores the images from reddit in an array and removes invalid images
            const results  = res.data.children
            const getThumbnails = results.map(results => results.data.thumbnail)
            const filteredResults = getThumbnails.filter(thumbnail => {
                return thumbnail.startsWith("https");
            })
            imagesIndex = filteredResults.length - 1
   
            for (i = 0 ; i < filteredResults.length; i++){           
                let addImg = ''
                addImg = filteredResults[i]
               // console.log('imageArray', i, imagesIndex, filteredResults[i])
                images.push(addImg);
            } 

            // adding a buffer to allow the images to render
            setTimeout(1000)
            
            // adds the images to the html
            displayImage()

             // loops through the images at an interval
                        
             setLoop = setInterval(circulateImage, 3000)
            
        })
    

        .catch(console.warn)

    
}


// places images on the page from the array
function placeImage(divName){
    let imgDiv = document.querySelector(divName);
  
    // selects images at random to display
    const randomImageIndex = Math.floor(Math.random() * imagesIndex)
    
    //creates image elements in html
    let randomImage = images[randomImageIndex]

    //console.log('random', randomImageIndex, imagesIndex, randomImage)
    const imgTag = new Image()    
    imgTag.src = randomImage
    imgTag.alt = searchTerm[0]
    if (imgDiv.hasChildNodes()){
        imgDiv.removeChild(imgDiv.firstChild)
    } 
    imgDiv.append(imgTag)
}

// populates random images into the div id, which is passed
function displayImage(){
    imageDiv.style.background =  "white";
    placeImage('#squareOne')
    placeImage('#squareTwo')
    placeImage('#squareThree')
    placeImage('#squareFour')
    placeImage('#squareFive')
    placeImage('#squareSix')
    placeImage('#squareSeven')
    placeImage('#squareEight')
    placeImage('#squareNine')
    resetButton()
}

// circulates the images on the screen from the images array
function circulateImage(){
    placeImage('#squareOne')
    placeImage('#squareTwo')
    placeImage('#squareThree')
    placeImage('#squareFour')
    placeImage('#squareFive')
    placeImage('#squareSix')
    placeImage('#squareSeven')
    placeImage('#squareEight')
    placeImage('#squareNine')
             
}

//get array of images based on search term
// when the user clicks the submit button this function is triggered
// sets the search term used to get the appropriate images, clears the initial screen, calls the function to display the images
// populates images on the page
function submitSearch(){
    searchTerm[0] = document.getElementById("searchText").value
    removeAllChildNodes(initial)
    getImage()
}

// resets the page and returns to "initial"
function resetPage(){
    clearInterval(setLoop)
    removeAllChildNodes(squareOne)
    removeAllChildNodes(squareTwo)
    removeAllChildNodes(squareThree)
    removeAllChildNodes(squareFour)
    removeAllChildNodes(squareFive)
    removeAllChildNodes(squareSix)
    removeAllChildNodes(squareSeven)
    removeAllChildNodes(squareEight)
    removeAllChildNodes(squareNine)
    removeAllChildNodes(resetId)
    images = []
    imagesIndex = 0
    searchTerm = ['']
    imageDiv.style.background = "#333333"
    getTitle.innerText = ''
    initialScreen()

}

// creates the reset button and adds listener
function resetButton(){     
    const resetButton = document.getElementById("resetId").appendChild(document.createElement("button"))
    resetButton.setAttribute("type","button")
    resetButton.setAttribute("id", "reset")
    resetButton.innerText = 'start new search' 
    resetButton.addEventListener('click', resetPage, false )
}





