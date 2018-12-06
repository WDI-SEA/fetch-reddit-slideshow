// Function that adds the images
function addImage(jsonImg) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = jsonImg.data.url;
    document.getElementById("search-results").appendChild(li).appendChild(img);
}

document.addEventListener("DOMContentLoaded", function(){
    $("#search-form").submit(function(e){
        e.preventDefault();
        // form input becomes form
        let form = encodeURIComponent($("#search-input").val());
        
        // Set our API
        let requestURL = `http://www.reddit.com/search.json?q=${form}&limit=20&post-hint=image`;

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
                let jsonDataArray = jsonData.data.children;
                jsonDataArray.forEach(addImage);
                console.log(jsonDataArray);
            }).catch(function(error){
                console.log("Yikes, you got an error matey", error);
            })

    })
})