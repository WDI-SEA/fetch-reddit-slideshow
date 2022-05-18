// console.log('I am here')
//Global variables
const redditApi = 'https://www.reddit.com/search.json?nsfw=no&q='


//Event Listener
document.getElementById('go').addEventListener('click', e => {
    //Prevent default form submission
 e.preventDefault()
 let userInput = document.getElementById('go-input').value
 //Search from reddit
 if(userInput) {
     //Empty Form
     document.getElementById('go-input').value = ''
 } else {
     console.log('here')
 }
})






//Use AJAX to make a request

//Create button to stop animation


//Hide results
//Stop Button Click
//Go Button Click
//Functions 
//Call reddit API with ajax and using fetch function
