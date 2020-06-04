
let serchBtn = document.getElementById('btn').addEventListener('click', inputText);
let inputVal =document.getElementById('input').value;
let url = " http://www.reddit.com/search.json?q=";
let searchInput = url + inputVal + "+nsfw:no" ;

const searchResult = function() {
    fetch(url) 
        .then(function(responseData) {
            let jsonedData = responseData.json();
            return jsonedData;
        })
        .then(function(jsonData) {
            console.log(jsonData);

            let searchImage = jsonData.data.children;
            console.log(jsonData.data);
            for (let i=0; i<searchImage.length; i++) {
                let imageResult = document.createElement("slideImage");
                let urlImage = document.createElement("img");
                urlImage = searchImage[i].url
            }
        })
        .catch(function(error) {
                console.log(error);
        })
}
searchResult();