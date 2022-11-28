console.log("js is linked, yasssss")

//DOM content loaded
document.addEventListener('DOMContentLoaded', () => {

//define variables
    const requestUrl = "https://www.reddit.com/search.json?q="

    const imageDiv = document.querySelector('#img-holder')

    const body = document.querySelector('body')

    const submitButton = document.querySelector('#submit-button')

//remove default action from submit button
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault()

//variable for user's input data value
    const searchCriteria = document.querySelector('#search-criteria').value
    
submitButton.addEventListener('click', e => {

//main fetch request
    fetch(requestUrl + searchCriteria+ '+nsfw:no')
    //, {headers: {'Accept': 'application.json', "Content-Type": 'application/json'}})

        .then(responseData => responseData.json())

        .then(searchBoxInput => {
           
            //original boxes disappear:
            document.getElementsByClassName('instructions').style.display = 'none;'
            document.getElementsByClassName('input-bar').style.display = 'none;'

            // for (let i=0; i<=startThings.length; i+=1) {
            //     startThings[i].style.visibility = 'hidden;'
            // }

            console.log(searchBoxInput.data.children)

            const searchResults = searchBoxInput.data.children

            searchResults.forEach(result => {
                console.log(result.data.url)
                const img = new Image ()
                img.src = result.data.url
                imageDiv.appendChild(img)
            })  
                
              //setInterval:
            const pictures = document.querySelectorAll('img')
            console.log(pictures) 

            function slideshowFunction () {
                let i = 0 
                if (i===0) {
                    pictures[i].style.display = 'block;'}
                    else if (i===pictures.length) {
                        pictures[i-1].style.display = 'none;'
                        pictures[0].style.display = 'block;'; i = 0;}
                        else {
                            pictures[i-1].style.display = 'none;'
                            pictures[i].style.display = 'block;'}
                            
                            i++;
                        }
                        
            setInterval(slideshowFunction, 2000)
                
            //stop button that resets back
            const stop = document.createElement('button')
            body.appendChild(stop)
            stop.addEventListener('click', e => {
            clearInterval(slideshowFunction)
            document.getElementsByClassName('start').style.display = 'block'
                

            })
        })
    })
    .catch((error)=>{
        console.log("There's been an error!", error);
    })
})
})
