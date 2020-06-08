document.addEventListener('DOMContentLoaded', function() {
    console.log("in main javascript");

    //Initialize DOM connections
    const searchTextField = document.querySelector('input[name="search_term"]');
    const searchButton = document.querySelector('input[name="search_button"]');
    const thisForm = document.querySelector('form');
    const thisTheater = document.querySelector('.theater');
    const endButton = document.querySelector('.end_show');

    //We only need JS to respond to two events:  user clicks start, and user clicks end.
    searchButton.addEventListener("click", startShow);
    endButton.addEventListener("click", endShow);

    //Initialize variables that need to be accessed by more than one function
    const thesePhotoResults = [];
    let photoInterval;

    function getMorePhotos(searchTerm){
        thisTheater.innerHTML = "Please wait.  Selecting only the choicest images takes time.";
        //unlike the other form elements, it seemed like radio button status would not update here as its value changed, so we needed to reference it here instead of at the top.
        let resultPriority = document.querySelector('input[name="result_priority"]:checked');
        let thisFetchUrl = `https://www.reddit.com/search.json?limit=100&q=${searchTextField.value}&sort=${resultPriority.value}`;
        console.log("Fetching " + thisFetchUrl);
        fetch(thisFetchUrl)
        .then(function(responseData){
            return responseData.json();
        })
        .then(function(jsonData){
            // filter & map the raw JSON data and keep only the images.
            let theseResultUrls = jsonData.data.children.map(function(child){
                return child.data.url;
            })
            let thesePhotoResults = theseResultUrls.filter(function(thisResult){ return (thisResult.substring(thisResult.length-4, thisResult.length) === ".jpg")});
            // if the posts fetched from Reddit contained images, display them.  Otherwise display a regretful message.
            if (thesePhotoResults.length > 0){
                console.log("I now have " + thesePhotoResults.length + " photos.  Displaying random results.");
                photoInterval = setInterval(function() {
                    let nextPhoto = thesePhotoResults[Math.floor(Math.random()*thesePhotoResults.length)];
                    console.log("Next photo url is " + nextPhoto);
                    thisTheater.innerHTML = `<img src="${nextPhoto}" alt="image search result">`;
                }, 3500);
                //There's a long delay before first image gets posted.  I think maybe the 3500 interval is running before even one image gets posted.  Should fix this.
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