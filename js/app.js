console.log("Everything looks good, hoss!");

console.log("🐱");

//making reference to pieces of my code for future use
const div1 = document.getElementById("where-search");
const submit = document.getElementById("submit-search");
const search = document.getElementById("search-box");
const imageBox = document.getElementById("show-image");
const message = document.getElementById("message");
const message2 = document.getElementById("message2");
const stopBtn = document.getElementById("stopBtn");
let imgArray = [];
let searchTerm = "";

//this works when it is here
 message2.style.display = "none";
 stopBtn.style.display = "none";


function searchImages () {
//HOORAY, THIS IS FUCKING WORKING NOW
searchTerm = document.getElementById("search-box").value;
stopBtn.style.display = "inline";
div1.style.display = "none";
search.style.display = "none";
submit.style.display = "none";


    fetch("https://www.reddit.com/search.json?q=" + searchTerm + "+nsfw:no") 
        .then(function(responseData) {
            let fetchData = responseData.json()
            return fetchData;
        })
        .then(function (fetchData){
                console.log(fetchData);
                let results = fetchData.data.children
                console.log("🦞");
                console.log(results);
                //iterate through the results in the console
                for (let i = 0; i < results.length; i++){
                    //this grabs the image urls from a reddit search
                    console.log(results[i].data.url) 
                    //think about using filter instead of this method
                    //cleaner syntax, stronger code
                    if (results[i].data.url.endsWith(".jpeg") || results[i].data.url.endsWith(".png") || results[i].data.url.endsWith(".jpg")){
                        imgArray.push(results[i].data.url);
                    } else {
                        console.log("Uh oh! Nothing to see here. Sorry!");
                    }
                }
                //need to filter through the ones that have jpg, png, 
                //this should set the src to the url
                //interval needs to be doing this work
                //this is basically an interval going way too fast
                let i = 0;  

                setInterval(function (){
                    imageBox.src = imgArray[i];
                    i++;
                    //have we reached the final index?
                    if(i > imgArray.length){
                        i = 0;
                    }
                }, 6000)
            })
        .catch(err => {
            console.log("Oh no! Someone made a silly mistake!")
    })  
}

    //using setInterval to move through images


    //change the images

        //make a stop button so user can search again
        stopBtn.addEventListener("click", function resetIt(){
            clearInterval(timeIt());
            message.style.display = "none";
            submit.style.display = "none";
            search.style.display = "none";
            imageBox.style.display = "none";
        })
        
    


