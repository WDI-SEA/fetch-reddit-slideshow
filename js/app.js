document.addEventListener('DOMContentLoaded', function() {
    console.log("in main javascript");

    const searchTextField = document.querySelector('input[name="search_term"]');
    const searchButton = document.querySelector('input[name="search_button"]');
    const thisForm = document.querySelector('form');
    const thisTheater = document.querySelector('.theater');
    const endButton = document.querySelector('.end_show');

    searchButton.addEventListener("click", startShow);
    endButton.addEventListener("click", endShow);

    const thesePhotoResults = [];
    let photoInterval;

    function getMorePhotos(searchTerm){
        thisTheater.innerHTML = "Please wait.  Selecting only the choicest images takes time."
        fetch(`https://www.reddit.com/search.json?limit=100&q=${searchTextField.value}`)
        .then(function(responseData){
            return responseData.json();
        })
        .then(function(jsonData){
            let theseResultUrls = jsonData.data.children.map(function(child){
                return child.data.url;
            })
            let thesePhotoResults = theseResultUrls.filter(function(thisResult){ return (thisResult.substring(thisResult.length-4, thisResult.length) === ".jpg")});
            if (thesePhotoResults.length > 0){
                console.log("I now have " + thesePhotoResults.length + " photos.  Displaying random results.");
                photoInterval = setInterval(function() {
                    let nextPhoto = thesePhotoResults[Math.floor(Math.random()*thesePhotoResults.length)];
                    console.log("Next photo url is " + nextPhoto);
                    thisTheater.innerHTML = `<img src="${nextPhoto}" alt="image search result">`;
                }, 5000);
            } else {
                thisTheater.innerHTML = "Oh dear!  Not enough people post photos about this on Reddit.  It must not exist.";
            }
        })
    }

    function endShow(){
        clearInterval(photoInterval);
        thisTheater.innerHTML = "<img src='thats-all-folks.jpg' alt='thats all folks!'>";
        endButton.style.display = "none";
        thisForm.style.display = "initial";
    }

    function startShow(e){
        e.preventDefault();
        getMorePhotos(searchTextField.value);
        endButton.style.display = "initial";
        thisForm.style.display = "none";
    }
});