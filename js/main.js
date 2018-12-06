document.addEventListener("DOMContentLoaded", function(){
    $("#search-form").submit(function(e){
        e.preventDefault();
        // I will probably have to figure out how to change this to a string with no whitespace, but plusses instead.
        let form = $("#search-input").val();
        
        // Set our API
        let requestURL = `http://www.reddit.com/search.json?q=${form}&limit=20`;

        // Let's make fetch happen
        fetch(requestURL)
            .then(function (responseData) {
                return responseData.json();
            }).then(function (jsonData) {
                // What we do in the Json
                console.log(jsonData);
            }).catch(function(error){
                console.log("Yikes, you got an error matey", error);
            })

    })
})