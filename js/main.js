//DOM REFERENCES
let goButton = document.getElementById('go');
let stopButton = document.getElementById('stop');
let inputF = document.getElementById('inputForms');
let searchValue = document.getElementById('searchText');
// let imgIn = document.getElementById('slideshow');
 


//testing url and fetch to find where pics are stored
let url = "http://www.reddit.com/search.json?q=nature+nsfw:no";



//fetch function
const getData = function() {
    fetch(url)
        .then(function(responseData) {
            let jsonedData = responseData.json();
            return jsonedData;
        }) 
        .then(function(jsonData) {
            //looking into the parsed data to find where images are held
            console.log(jsonData)
            let findImage = jsonData.data.children
            let imageArr = [];

            for (let i = 0; i < findImage.length; i++) {
                let imageInsert = document.getElementById('slideshow')
                let imgur = document.createElement("img");
                imgur.src = `${findImage[i].data.url}`
                imageArr.push(imgur.src);
                //Question: If I push an image into an array(with its src), how can I view it?
                // console.log(data[i].preview.images[source])
            }
        }) 
        .catch(function(error) {
            console.log('farts');
            console.log(error)
        })
}

getData();

//initialization function that clears out the form function

function urlCom(url) {
    let urlInsert = searchValue.value ;
    url = "http://www.reddit.com/search.json?q=" +urlInsert+ "+nsfw:no";
    //this function should concatenate the search value with the url
}


//click function that takes in data inputted and replaces with slideshow and stop button;
goButton.addEventListener('click', getData);

//click function that stops and returns the search bar