window.addEventListener("DOMContentLoaded", (e) => {

console.log("Everything looks good, hoss!");
const message2 = document.getElementById("message2");
const stopBtn = document.getElementById("stopBtn");
stopBtn.style.display = "none";
message2.style.display = "none";

console.log("🐱");

//curly and soft boy for dom loaded event listener end

//need a function to stop the slideshow and reset the page
})

//return results from reddit that are images
function searchImages (){


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
 message.style.display = "none";
 submit.style.display = "none";
 search.style.display = "none";
 div1.style.display = "none";
 stopBtn.style.display = "inline";

//HOORAY, THIS IS FUCKING WORKING NOW
searchTerm = document.getElementById("search-box").value;

    fetch("https://www.reddit.com/search.json?q=" + searchTerm + "+nsfw:no") 
        .then(function(responseData) {
            let fetchData = responseData.json()
            return fetchData;
        })
        .then(function skinnyLegend(fetchData){
                console.log(fetchData);
                let results = fetchData.data.children
                console.log("🦞");
                console.log(results);
                //iterate through the results in the console
                for (let i = 0; i < results.length; i++){
                    //this grabs the image urls from a reddit search
                    console.log(results[i].data.url) 
                    if (results[i].data.url.endsWith(".jpeg") || results[i].data.url.endsWith(".png") || results[i].data.url.endsWith(".jpg")){
                        imgArray.push(results[i].data.url);
                    } else {
                        console.log("Uh oh! Nothing to see here. Sorry!");
                    }
                }
                    //need to filter through the ones that have jpg, png, 
                    //this should set the src to the url
                    for (let i = 0; i < imgArray.length; i++){
                    imageBox.src = imgArray[i];
                    }
                 
                 timer = setInterval(skinnyLegend(), 5000);
            })
        .catch(err => {
            console.log("Oh no! Someone made a silly mistake!")
    })  

        //make a stop button so user can search again
        stopBtn.addEventListener("click", function resetIt(){
            clearInterval(timeIt());
            message.style.display = "none";
            submit.style.display = "none";
            search.style.display = "none";
            imageBox.style.display = "none";
        })
        
}


