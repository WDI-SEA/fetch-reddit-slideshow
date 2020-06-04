console.log('testing, 1,2,3');

function errorHandler(error) {
    console.log('this is an error')
}

fetch('https://reddit.com/search.json?q=cats%20and%20dogs%20cuddling')
.then(function(responseData) {
    let jsonData = responseData.json()
    return responseData.json();
})
.then(function(jsonData) {
    console.log(jsonData);

    //local variable 
    let results = jsonData.data.children
     //iterate through results
     for (let i = 0; i < results.length; i++) {
         console.log(results[i].data.title);
         console.log(results[i].data.url)
     }
.catch(errorHandler)
