// console.log('I am here')
//Global variables
const redditApi = 'http://www.reddit.com/search.json?q=cats+nsfw:no'
let currentImg = []


//Event Listener
// document.getElementById('go').addEventListener('click', e => {
//     //Prevent default form submission
//     e.preventDefault()
//     let userInput = document.getElementById('go-input').value
//     //Search from reddit
//     if (userInput) {
//         //Empty Form
//         document.getElementById('go-input').value = ''
//     } else {
//         console.log('here')
//     }

//     fetch(redditApi)
//         .then(response => response.json())
//         .then(data => console.log(data.children));
        
//      console.log(redditApi)
// })
fetch(redditApi)
// console.log(fetch(redditApi))
        .then(function(response){
            // console.log(response.json())
            return response.json()
        })
        .then(function(response){
            console.log(response)
            // return response.json()
        })

        


//Functions 
currentImg = data.children[1]
console.log(data.children[1])

//Use AJAX to make a request

//Create button to stop animation


//Hide results
//Stop Button Click
//Go Button Click
//Call reddit API with ajax and using fetch function
