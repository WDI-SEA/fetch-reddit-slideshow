//DOM REFERENCES
let goButton = document.getElementById('go');
let stopButton = document.getElementById('stop');
let searchValue = document.getElementById('searchText').value;
var submitForm = document.getElementById('inputForm');
// let imgIn = document.getElementById('slideshow');
 


//testing url and fetch to find where pics are stored
//  url = "http://www.reddit.com/search.json?q=nature+nsfw:no";
var link = `http://www.reddit.com/search.json?q=${e.target[0].value}+nsfw:no`;



//fetch function
const getData = function(e) {
    e.preventDefault();
    getData(searchValue);
    form.remove();

    fetch(link)
        .then(function(responseData) {
            let jsonedData = responseData.json();
            return jsonedData;
        }) 
        .then(function(jsonData) {
            //looking into the parsed data to find where images are held
            console.log(jsonData)
            let findImage = jsonData.data.children
            let imageArr = [];

            imageArr = findImage.map(function(imgLine) {
                return imgLine.data.url
            })
            filterJPG = imageArr.filter(imgLine);
            setInterval(slideImg, 5000);
            }
        .catch(function(error) {
            console.log('farts');
            console.log(error)
        })
    }


function imgLine(display) {
    if (display.includes(".jpg")) {
        return true
    }
}
function slideImg () {

}

form.addEventListener('submit', getData);
