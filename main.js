document.addEventListener("DOMContentLoaded", function() {

    let url = "http://www.reddit.com/search.json?q=cats+nsfw:no"


    function errorHandler(error) {
        console.log(error);
    }

    function getImage() {
        fetch(url)
            .then(function(responseData) {
                return responseData.json();
            })
            .then(function(jsonData) {
                currentImages = jsonData.data.children.map(function(pic) {
                    return {
                        url: pic.data.url,
                        postHint: pic.data.post_hint
                    }
                })
                .filter(function(pic) {
                    return pic.postHint === "image"
                })
                console.log(currentImages)
                // startSlideshow()
            })
            .catch(errorHandler);
    }
    getImage();


    document.getElementById("input-container").addEventListener("submit", function(e) {
        e.preventDefault();
        let inputSearch = document.getElementById('input').value
        if(inputSearch){
            getImage(inputSearch)
            document.getElementById('input').value = ''
        }
        else{
            console.log(`That's an empty string.`)
        }
    })
})



