// Function that adds the images
function addImage(jsonImg) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = jsonImg;
    document.getElementById("search-results").appendChild(li).appendChild(img);
}

document.addEventListener("DOMContentLoaded", function(){
    $("#search-form").submit(function(e){
        e.preventDefault();
        // form input becomes form
        let form = encodeURIComponent($("#search-input").val());
        
        // Set our API
        let requestURL = `http://www.reddit.com/search.json?q=${form}&limit=30&post-hint=image`;

        // Lets clear the form
        var searchResults = document.querySelectorAll("li");
        for (let i = 0; i < searchResults.length; i++) {
            searchResults[i].remove();
        }

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
                console.log(newArray);
            }).catch(function(error){
                console.log("Yikes, you got an error matey", error);
            })
        // Hide and Seek where the seek is a button called reset-btn
        $("#start-state").addClass("hidden");
    })
    $("#reset-btn").click(function(){
        $("#start-state").removeClass("hidden");
        console.log("Reseting things");
    })
    $("#stop-slideshow").click(function(){
        console.log("slideshow stopped");
    })
})