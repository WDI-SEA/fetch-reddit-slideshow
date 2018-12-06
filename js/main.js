// Function that adds the images
function addImage(jsonImg) {
    $("#search-results").slick(`slickAdd`, `<div class="img-container"><img class="img-result" src=${jsonImg}></div>`);
}

document.addEventListener("DOMContentLoaded", function(){
    $("#search-form").submit(function(e){
        e.preventDefault();
        // form input becomes form
        let form = encodeURIComponent($("#search-input").val());
        
        // Set our API
        let requestURL = `http://www.reddit.com/search.json?q=${form}&limit=30&post-hint=image`;

        // Let's make fetch happen
        fetch(requestURL)
            .then(function (responseData) {
                return responseData.json();
            }).then(function (jsonData) {
                // What we do in the Json: Print deez puppies
                    let newArray = [];
                    let pool = jsonData.data.children;
                    pool.forEach(function(child){
                        let imgUrl = child.data.url;
                        if (imgUrl.endsWith(".jpeg") || imgUrl.endsWith(".png") || imgUrl.endsWith(".jpg")) {
                            newArray.push(imgUrl);
                        }
                    })
                newArray.forEach(addImage);
            }).catch(function(error){
                console.log("Yikes, you got an error matey", error);
            })
        // Hide and Seek where the seek is a button called reset-btn
        $("#start-state").addClass("hidden");

        // Slideshow goes here
        $('#search-results').slick({
              autoplay: true
            });
    })
    $("#reset-btn").click(function(){
        $("#start-state").removeClass("hidden");
        // Lets clear the form
        var searchResults = document.querySelectorAll(".img-container");
        for (let i = 0; i < searchResults.length; i++) {
            searchResults[i].remove();
        }
        console.log("Reseting things");
    })
    $("#stop-slideshow").click(function(){
        $('#search-results').slick("slickPause");
    })
})