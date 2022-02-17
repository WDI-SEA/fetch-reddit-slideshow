let userInputField, searchButton, pictureDiv, stopButton, slideshow, formBox

function fetchPictures (name) { //add argument of 'name'
formBox.style.visibility = 'hidden'
stopButton.style.visibility = 'visible'
document.querySelector('p').style.visibility = 'visible'
fetch(`http://www.reddit.com/search.json?q=${name}+nsfw:no`)
.then(fetchResponse => fetchResponse.json())
.then(jsonified =>{
    document.querySelector('p').style.visibility = 'hidden'
    let children = jsonified.data.children //storing url data from children
    let urlArray = children.map(child => {  // creates array of urls from data children
        //    console.log(child.data.url)
        return child.data.url
    }) 
    // console.log(urlArray) 
    const filterArray = urlArray.filter(url => url.includes('jpg')) //filters url array to include good links)
    // console.log(filterArray)
    // iterate through array of urls on a timer
    let i = -1
    slideshow = setInterval(()=> {
        i++ 
        if(i >= filterArray.length) i=0
        // delete url and add new one on timer
        while(pictureDiv.firstChild){
            pictureDiv.firstChild.remove()
        }
        // append img.src child to display div
        let newPic = document.createElement('img')
        newPic.classList.add('animate__animated', 'animate__fadeIn')
        newPic.src = filterArray[i]
        pictureDiv.appendChild(newPic)
        // console.log(filterArray[i])
    }, 3000)
    })
.catch()
}

document.addEventListener('DOMContentLoaded', () => {
    formBox = document.getElementById('form-box')
    
    searchButton = document.querySelector('form').addEventListener('submit', e=>{
        e.preventDefault()
        userInputField = document.querySelector('input').value
        pictureDiv = document.querySelector('#pic-display')
        fetchPictures(userInputField)
       
    })
    stopButton = document.getElementById('stop-button')
    stopButton.addEventListener('click', ()=>{
        clearInterval(slideshow)
        slideshow = undefined
        formBox.style.visibility = 'visible'
        while(pictureDiv.firstChild){
            pictureDiv.firstChild.remove()
        }
        stopButton.style.visibility = 'hidden'
        
    })  
    stopButton.style.visibility = 'hidden'
    document.querySelector('p').style.visibility = 'hidden'
   
})

 