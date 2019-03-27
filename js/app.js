document.addEventListener("DOMContentLoaded", main) 

function main() {
    //TODO assign a listener to the button that fetches images
    var button = document.getElementById("search")
    button.addEventListener("click", getImages)
    // Prevent default form submission and verify that you can type something into the form
    event.preventDefault()
    getImages(REQUEST_URL)
}

function getImages(REQUEST_URL) {
    document.getElementById('search').addEventListener('click', function(e) {
        console.log('search')
    });
        // define url
        const REQUEST_URL =`http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`;
        // retrieve images from URL
        var data = document.getElementById("searchTerm").value;
        fetch(REQUEST_URL)
        .then(function(data) {
            var newData = data.json()
            return newData
        })
        .then(function(jsonData) {
            // Create an array of image URLs (tip: use filter and map).
            var images = []
            var imageCounter = 0;
            json.data.children.forEach(function(item) {
                images.push(item.data.url);
                setInterval()
                //console.log(item.data.url) 
            })
            // Cycle through images
            var images = images.filter(function (image) {
                if (image.includes('jpeg') || image.includes('jpg') || image.includes('png')) {
                    return true;
                } else {
                    return false;
                }
            })
            // Make the form / title / description hide
            // tip: use setInterval
            setInterval(function() {
                imgElement.src = images[imageCounter];
                imageCounter++;
                if (imageCounter === images.length) {
                    imageCounter = 0;
                }
            }, 1000);
        })
    }    
