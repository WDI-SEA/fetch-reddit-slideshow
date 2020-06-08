let url = 'http://www.reddit.com/search.json?q=kittens';
let i = 0;
let catData = [];
let Kitty = document.getElementById('KittyKat');

const displayQuote = function () {
    fetch(url)
        .then(function (responseData) {
            let jsonData = responseData.json()
            return jsonData;
        })
        .then(function (jsonData) {
            console.log(jsonData);
            // let results = jsonData.data.children.data.url;
            /* for (i; i < jsonData.data.children.length; i++) {
                 console.log(jsonData.data.children[i].data.preview.images[0].source.url)
             } */
            const catArray = jsonData.data.children.map(function (cat) {
                if (cat.data.url === cat.data.url.endsWith("jpg")) {
                    return cat.data.url;
                    // Tried to redirect my images from forbidden files to images within the child - couldn't get to work 
                    //pushing img into array 
                    //checking if there is a length - if not, the value doesn't exist 
                    // const url = cat.data.images[0].source.url;
                    // const yeet = str_replace('amp;s', 's', yeet);
                    // return yeet;
                    // return decodeURI(cat.data.preview.images[0].source.url)
                    // decodeURI = if URL has a bunch of gibberish it'll fix it

                }
            })

            })
    
            //reassigns catData
            /* let kittens = document.createElement('li');
            kittens.textContent = jsonData;
            document.getElementById('Kitty').appendChild(kittens);*/ 
                .catch (function(error) {
                console.log("Woof");
                console.log(error);
                }
        )
    }


displayQuote();
document.addEventListener("DOMContentLoaded", displayQuote);
//const catData = displayQuote();
//access catArray within displayQuote to use in different function w/o the lengthiness

let index = 0;
//Callback function
setInterval(function () {
    index++;
    // increases before running the array so that it loops - setting below would offput the time
    if (index >= catData.length) {
        index = 0;
    }
    Kitty.src = catData[index];
    console.log(catData[index]);
}, 10000)


// function for starting and stopping the slideshow 
/*function toggleDescriptor(myDescriptor) {
    var e = document.getElementById('myDescriptor');
    if (e.style.display == 'block')
        e.style.display = 'none';
    else (e.style.display = 'block')
}*/


