// url for reddit api that is used
// saves the filtered data from arrayOfImg
// number that keep track of numbers of itterations though our functions
// is also used to access our array elements
// boolen to know if it is our first run allowing is to push api data to array
// saves the specific data that we fetch from API

const requestUrl ="http://www.reddit.com/search.json?q="
var number = 0
var firstRun = true
var arrayOfImg = []
var filterArray = [] 

// hides our stop button once DOM is loaded
// hides our image once DOM is loaded
// adding event to know  when submit button has been pressed
document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById('stop').style.display = 'none'
    document.getElementById('img').style.display = 'none'
    form.addEventListener('submit', (e)=> {

        // function that clears our interval that calls getPhoto
        const stopShow = () => {
            console.log('Stopped Slid Show')
            clearInterval(newPhoto)
        }

        // stops refershing 
        // calls get photo for first time function for the first time
        // shows our stop button after url for img is set
        // shows our image after url is set
        // our form is hidden while we are in slidshow display
        // our title is hidden while we are in slidshow display
        // our instructions is hidden
        // need to access our now showing button
        // calls our function to change photos every 4 seconds after our first call

        e.preventDefault()
        getPhoto()
        
        document.getElementById('stop').style.display = 'flex'
        document.getElementById('img').style.display = 'flex'
        document.getElementById('form').style.display='none'
        document.getElementById('title').style.display='none'
        document.getElementById('instructions').style.display ='none'
        const stopButton = document.getElementById('stop')
        const newPhoto = setInterval(getPhoto, 4000)

        // add eventListener for when our stop button is pressed
        // clears our interval that calls getPhoto
        // shows our form for user to use again
        // shows our title again for user
        // shows our instructions
        // hides our stop button
        // gains access to our img
        stopButton.addEventListener('click', () => {
            
            clearInterval(newPhoto)
            document.getElementById('form').style.display='flex'
            document.getElementById('title').style.display='flex'
            document.getElementById('instructions').style.display ='flex'
            document.getElementById('stop').style.display='none'
            
            // change the src attribute of img to a empty string
            // hide our img
            // emptys our filtered array
            // emptys our unfiltered array
            // sets our first run to true
            // sets our itterater to 0
            const img = document.getElementById(`img`)
            img.src = ''
            document.getElementById('img').style.display = 'none'
            filterArray = []
            arrayOfImg = []
            firstRun = true
            number = 0
        })
    })

    // uses fetch to get api data and filters it
    // then calls another function that sets url of img
    const getPhoto =() => { 
        // fetch based on input value 
         fetch(`${requestUrl}${input.value}+nsfw:no`) 

        // used to wait untill data is recived
        // extract the JSON data from the fetch object
        .then((responseData)=>{
            return responseData.json()
        })
        // is passed the data after it is retrived from url
        // test if first time so array dosent get loaded more than once
        .then((jsonData)=>{
            
            // pushes all url data to our unfiltered array
            // filters out any array elements that do not have jpg or png
            // calls function that imputs first image
            // function that keeps track of number and test if end of array
            // sets first run to false
            if(firstRun){
                for(let i = 0;i<jsonData.data.children.length;i++){
                    arrayOfImg.push(jsonData.data.children[i].data.url)
                }
                filterArray = arrayOfImg.filter(filterImg)
                addPhoto(filterArray)
                slideShow(filterArray.length)
                firstRun = false

                // passes array and uses number to input next url in array
                // function that keeps track of number and test if end of array
            } else {
                addPhoto(filterArray)
                slideShow(filterArray.length)
            }     
        })
        .catch((error) => {
            // if any error is sent back you have access to it here
            console.log('ERROR')
            console.log(error)
        }) 
    }
    // is called by filter to return only urls with jpg or png to filterArray
    const filterImg = (img) => {
        return img.includes('.jpg' || '.png')
    }

    // addPhoto either starts our slideShow or moves to next img and gets passed our filterArray
    // access our img by Id
    // changes the img's src attribute to url from passed array
    const addPhoto = (filterArray) => {
        const img = document.getElementById('img')
        img.src = filterArray[number]
    } 

    // function that keeps track of number and adds 1 each time also passes length of filterArray
    // keeps slideshow running in loop
    // test if number is greater than filterArray lenght
    // if not greater do nothing
    // if greater than set to zero and start show over
    function slideShow (num) {
        number ++
        if(number < num) { 
        } else {  
            number = 0
        }
    }
})