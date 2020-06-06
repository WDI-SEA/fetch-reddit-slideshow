document.addEventListener('DOMContentLoaded', function() {
    console.log("in main javascript");

    const searchTextField = document.querySelector('input[name="search_term"]');
    const searchButton = document.querySelector('input[name="search_button"]');
    const thisForm = document.querySelector('form');
    const thisTheater = document.querySelector('.theater');
    const endButton = document.querySelector('.end_show');

    searchButton.addEventListener("click", startShow);
    endButton.addEventListener("click", endShow);

    console.log(searchButton);

    function endShow(){
        thisTheater.style.opacity = "100%";;
        endButton.style.display = "none";
        thisForm.style.display = "initial";
    }

    function startShow(e){
        e.preventDefault();
        console.log(`search term was ${searchTextField.value}`);
        fetch(`https://www.reddit.com/search.json?q=${searchTextField.value}`)
            .then(function(responseData){
                return responseData.json();
            })
            .then(function(jsonData){
                console.log("Here is the data", jsonData);
                let theseResultUrls = jsonData.data.children.map(function(child){
                    return child.data.url;
                })
                let thesePhotoResults = theseResultUrls.filter(function(thisResult){ return (thisResult.substring(thisResult.length-4, thisResult.length) === ".jpg")});
                console.log("thesePhotoResults:", thesePhotoResults);
                if (thesePhotoResults.length > 0){
                    thisTheater.innerHTML = `<img src="${thesePhotoResults[0]}" alt="image search result">`;
                }
            })
        console.log("just fired JSON request");
        endButton.style.display = "initial";
        thisForm.style.display = "none";
    }
});