let goButton = document.getElementById("button");
let stopButton = document.getElementById("stopButton");

let redditLink = "https://www.reddit.com/search.json?q=";

let results = document.getElementById("results");
let images = [];

var test = 0;

let timer = null;

goButton.addEventListener("click",getPics);
stopButton.addEventListener("click",stop);

function getPics(){
    event.preventDefault();
    var userInput = document.getElementById("textField").value;
    hideForm();
    toggle();
    
    fetch(redditLink + userInput + "+nsfw:no")
        .then(function(responseData){
            return responseData.json();
        })
        .then(function(jsonData){
            console.log(jsonData);

            let searchResults = jsonData.data.children;

            for(let i = 0; i < searchResults.length; i++){
                if(searchResults[i].data.url.endsWith(".jpg")){
                    images.push(searchResults[i].data.url);
                }
            }
            timer = setInterval(slideShow,2000)
        })
}


function slideShow(){
    let picture = document.getElementById("picture");
    test++;

    if(test >= images.length){
        test = 0;  
    }
    picture.src = images[test];
}

function stop() {
    clearInterval(timer);
    toggle();
}

function toggle(){
    let x = document.getElementById("stopButton");
    // let y = document.getElementById("form");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    // if (y.style.display === "block") {
    //     y.style.display = "none";
    // } else {
    //     y.style.display = "block";
    // }
}

function hideForm(){
    let y = document.getElementById("form");

    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
}