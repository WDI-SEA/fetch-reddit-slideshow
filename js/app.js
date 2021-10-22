
const requestUrl ="http://www.reddit.com/search.json?q="
var number = 0
var firstRun = true
var arrayOfImg = []
var filterArray = [] 



document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('stop').style.display = 'none'
    document.getElementById('img').style.display = 'none'
    // adding event to know  when submit button has been pressed
    form.addEventListener('submit', (e)=> {

        const stopShow = () => {
            console.log('Stopped Slid Show')
            clearInterval(newPhoto)
            clearInterval(stopSlide)
        }

        e.preventDefault()
        // calls function for the first time
        getPhoto()
        document.getElementById('stop').style.display = 'flex'
        document.getElementById('img').style.display = 'flex'
        document.getElementById('form').style.display='none'
        document.getElementById('title').style.display='none'
        const stopButton = document.getElementById('stop')
        
        // ends our interval for slide show
        // const stopSlide = setInterval(stopShow, 30000)
        // calls our function to change photos 
        const newPhoto = setInterval(getPhoto, 4000)

        stopButton.addEventListener('click', () => {
            clearInterval(newPhoto)
            document.getElementById('form').style.display='flex'
            document.getElementById('title').style.display='flex'
            document.getElementById('stop').style.display='none'
            const img = document.getElementById(`img`)
            img.src = ''
            document.getElementById('img').style.display = 'none'
            filterArray = []
            arrayOfImg = []
            firstRun = true
            number = 0
        })
    })

    

    // this is function to grab the image 
    const getPhoto =() => { 
        // fetch based on input value 
         fetch(`${requestUrl}${input.value}+nsfw:no`) 
        // used to wait untill data is recived
        .then((responseData)=>{
            // extract the JSON data from the fetch object
            return responseData.json()
        })
        // is passed the data after it is retrived from url
        .then((jsonData)=>{
            console.log("JSON DATA:")
            console.log(jsonData.data.children[0].data.url)
            // test if first time so array dosent get loaded more than once
            if(firstRun){
                // sets image to photo
                for(let i = 0;i<jsonData.data.children.length;i++){
                    // pushs url's into our array
                    arrayOfImg.push(jsonData.data.children[i].data.url)
                }
                // filters out any array elements that do not have jpg or png
                filterArray = arrayOfImg.filter(filterImg)
                console.log(filterArray)
                // calls function that imputs first image
                addPhoto(filterArray)
                console.log(filterArray.length)
                // keeps track of our counter and increments each time funciton is called
                slideShow(filterArray.length)
                firstRun = false
            } else {
                // if not the first go around then call function that removes image 
                console.log(filterArray)
                // this funciton also places next element into the array
                addPhoto(filterArray)
                // keeps track of our counter and increments each time funciton is called
                slideShow(filterArray.length)
            }
             
        })
        .catch((error) => {
            // if any error is sent back you have access to it here
            console.log('ERROR')
            console.log(error)
        }) 

    }

    const filterImg = (img) => {
        return img.includes('.jpg' || '.png')
    }

    const addPhoto = (filterArray) => {
        console.log('add Photo called')
        console.log(number)
        // create an new li element
        const img = document.getElementById('img')
        // add person's name as text to the li
        img.src = filterArray[number]
        console.log(img)
    } 

    const changePhoto = (filterArray) => {
        console.log('changePhoto called')
        console.log(number)
        // create next img in slidshow
        const img = document.getElementById(`img`)
        // give new img new Id
        // set img into new created element
        img.src = filterArray[number]
        console.log(img)
        // get older img
        const redditPhoto = document.getElementById('redditImg')
        // slideShow()
    }
      
    function slideShow (num) {
        number ++
        console.log(number)
        if(number < num) {
        } else {
            number = 0
        }
    }
})


