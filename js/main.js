var submitBtn = document.getElementById("submit");
var form = document.getElementById("reddit-form");
var newResults = [];


fetchTheThings = function(e) {
    e.preventDefault();
    var link = `https://www.reddit.com/search.json?q=${e.target[0].value}+nsfw:no`
    fetch(link)
    .then(function(responseData) {
        return responseData.json();
    })
    .then(function(jsonData) {
        let results = jsonData.data.children
        for(i=0; i < results.length; i++) {
            newResults.push(results[i].data.url)
        }
        console.log(newResults)
    })
    .catch(function(error){
        console.log(`🦖 ${error}`)
    })
}


form.addEventListener("submit", fetchTheThings)


/// map over newResults find things ending in .jpg

/// update photo src url

/// set interval to cycle the url every 2 seconds
