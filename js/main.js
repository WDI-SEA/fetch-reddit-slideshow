let text = document.getElementById("text");
let btn = document.getElementById("btn");
let pic = document.getElementById("pic");
let search = text.textContent;
let url = "http://www.reddit.com/search.json?q=cats+nsfw:no";
let allPics = [];

/* ------------------ Event Listener ---------------------*/

btn.addEventListener('click', getImage());

/* ------------------- Functions ------------------------*/


function getImage() {
    fetch(url)
        .then(function(responseData) {
            return responseData.json();
        })
        .then(function(jsonData){
            let array = jsonData.data.children;
            console.log(array);
            for (i = 0; i < array.length; i++) {
                if (array[i].data.url.endsWith("jpg")) {
                    // console.log(array[i].data.url);
                    // pic.src = array[i].data.url;
                    allPics.push(array[i].data.url);
                    console.log(allPics);
                    setInterval(nextImage(), 2000)
                }
            
            }
        })
}
    
function nextImage() {
    for (i = 0; i < allPics.length; i++) {
        pic.src = array[i].data.url;
    }
}
//  setInterval(nextImage(), 2000)