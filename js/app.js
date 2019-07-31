//Global Variables
let imageArr = [];

//Event Listeners
document.getElementById("reddit-show").addEventListener("submit", function(event) {
    event.preventDefault();
    var searchQuery = document.getElementById("query").value
    console.log(searchQuery);

    if(searchQuery) {
        showTime();
        //perform fetch
        fetch("https://www.reddit.com/search.json?q=" + searchQuery + "+nsfw:no")
        .then(function(responseData){
            return responseData.json();
        })
        .then(function(jsonData) {
           
                //iterate through images
                jsonData.data.children.forEach(function(img) {
                   
                    //set image variable
                    let slide = document.createElement("img");
                    slide.src = img.data.url;
                    console.log(slide);
                    //push images into imageArr
                    imageArr.push(slide);
                });
                //console.log(imageArr);
             });
    }
    else {
    alert("Hey, Enter something!");
    }

    slideShow();
});

document.getElementById("stop-btn").addEventListener("click", function() {
    stopShow();

})

//function that sets page to slideshow
function showTime() {
    document.getElementsByTagName("main")[0].style.visibility = "hidden";
    document.getElementById("stop-btn").style.visibility = "visible";
    document.getElementById("loading-msg").style.visibility = "visible";
}

function stopShow() {
    document.getElementById("slideshow-div").innerHTML = "";
    document.getElementById("query").value = "";
    document.getElementsByTagName("main")[0].style.visibility = "visible";
    document.getElementById("stop-btn").style.visibility = "hidden";
    document.getElementById("loading-msg").innerText = "Loading...";
}

function slideShow() {
    console.log("slideShow running");
    
    for (i =0; i < imageArr.length; i++) {
        console.log("slideShow line 63 running");
        console.log(imageArr[i]);
        //document.getElementById("slideshow-div").appendChild(imageArr[i]);
        slide.style.height = "150px";
        slide.style.width = "auto";
        slide.style.zIndex = "1";
        console.log("Loaded");
    };
    }
    // imageArr.forEach((slide) =>{
    //     document.getElementById("slideshow-div").appendChild(slide);
    //     slide.style.height = "150px";
    //     slide.style.width = "auto";
    //     slide.style.zIndex = "1";
    //     console.log("Loaded");
    //     setInterval(slideShow, 5000);
    // })

    // filter out images
    var filteredImages = function(image) {

    }
    