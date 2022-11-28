console.log("js is linked, yasssss")

//DOM content loaded
document.addEventListener('DOMContentLoaded', () => {

//define url variable
    const requestUrl = "https://www.reddit.com/search.json?q="

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
            // document.getElementsByClassName('.start').style.display = 'none'
            
            console.log(searchBoxInput)

            //create array of image URLs:
            const imgArray = searchBoxInput.results.filter((data) => {data.children[0].data.url})
            document.getElementById('img-holder').append('imgArray')    
                
              // add imgs to div "img-holder"

              //setInterval:
            const pictures = document.querySelectorAll('img')
            let i = 0   

            setInterval(function() {

                if (i===0) {
                pictures[i].style.display = 'block';}
                else if (i===pictures.length) {
                    pictures[i-1].style.display = 'none';
                    pictures[0].style.display = 'block'; i = 0;}
                else {
                    pictures[i-1].style.display = 'none';
                    pictures[i].style.display = 'block';}
              
                 i++;
                })
                
                , 2000;})
            })
        })

    })
              //create stop button:
            //   const stop = document.createElement('button')
            //   stop.style.
            //   body.append(button)

            //})

        
         //stop button that resets back
        //  submitButton.addEventListener('click', e => {
            //clearinterval
        //  document.getElementsByClassName('start').style.display = ''

        //  })
    // })

    // .catch(error => console.log('Error:', error));
    // .catch(console.warn);
// })