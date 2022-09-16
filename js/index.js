// get the container from the DOM
const container = document.querySelector('#container')
const slideShowBox = document.querySelector('#slideShowBox')
const form = document.querySelector('form')
const getAllPokemonBtn = document.querySelector('#see-all-pokemon')
const stopButton = document.querySelector('#stop-button')
const stopButtonDiv = document.getElementById('#stop-button-container')



//const onShowPicSuccess = (pictures) => {


//    while (slideShowBox.firstChild) {
 ///       slideShowBox.removeChild(slideShowBox.firstChild)
 //   }
 //   container.style.display = 'none'
 //  const slideShowBox = document.createElement('div')
 //  slideShowBox.classList.add('slideShowBox')
 //  slideShowBox.innerHTML = `
 ///       <h1>${picture.name}</h1>
 //       <img src="${picture.sprites.front_default}"/>
  // `
    
 ///   slideShowBox.appendChild(slideShowBox)
//}


    const showPic = (event) => {
    const pictureUrl = event.target.getAttribute('src')
    fetch(pictureUrl)
    .then(res => res.json())
    .then(onShowPicSuccess)
    .catch(console.error)
    }




    const onGetAllPicSuccess = (pictureArray) => {
	    pictureArray.data.children.forEach(picture => {
        if(picture.data.thumbnail !== 'self'){
        const picContainer = document.createElement('img')
	    picContainer.innerText = picture.name
        picContainer.classList.add('pic-container')
        picContainer.setAttribute('src', picture.data.thumbnail)
        picContainer.addEventListener('click', showPic)
        container.appendChild(picContainer)
        }
       })
    }
	



    document.addEventListener('DOMContentLoaded', () => {
    fetch('http://www.reddit.com/search.json?q=cats+nsfw:no')
           .then(res => res.json())
           .then(onGetAllPicSuccess)
           .catch(console.error)
     })


   

     
 form.addEventListener('submit', event => {
    
    while (form.firstChild) {
        form.removeChild(form.firstChild)
     }
      container.style.display = 'flex' 
      event.preventDefault()
      const stopButtonNew = document.createElement('button')
      stopButtonDiv.appendChild(stopButtonNew)
      stopButtonNew.setAttribute('type', 'submit')
      console.log('here')
      // stopButtonNew.innerText('Stop')
      // const pokeNumber = input.value
      fetch(`"http://www.reddit.com/search.json?q=${userInput}+nsfw:no"`)
      .then(res => res.json())
      .then(onShowPicSuccess)
      .catch(console.error)  
      stopButtonNew.addEventListener('click', () => {
      while (stopButtonDiv.firstChild) {
      stopButtonDiv.removeChild(stopButtonDiv.firstChild)
      }
      container.style.display = 'flex'

    })

     })