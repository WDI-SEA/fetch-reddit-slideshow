console.log('testing, 1,2,3');
let reddit = 'https://reddit.com/search.json?q='

//event listeners for DOM elements 
document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('search-bar').addEventListener('submit',redditData);

})
function redditData(e) {
    e.preventDefault()
    let search = document.getElementById('search-bar').value;

}
fetch(reddit + search)
    .then(function(responseData) {
        let jsonData = responseData.json()
        return responseData.json();
    })
    .then(function(jsonData) {
        console.log(jsonData);
        //posts array in the data
        let results = jsonData.data.children
        //iterate through results
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].data.title);
            console.log(results[i].data.url)
        })
    .catch(function(error) {
        console.log("this is an error", error);
    });
