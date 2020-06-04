
//VARIABLES//
let search = document.getElementById("search");
let searchbar = document.getElementById("searchbar");
let url = "http://www.reddit.com/search.json?q=cats+nsfw:no"
let directions = document.getElementById("directions")
let foundImages = document.createElement("IMG");
let removeItems = document.getElementById("itemsToRemove")


//CLICK EVENT FOR SEARCH BUTTON//
search.addEventListener("click", fetchItems);

//FIND VALUE OF SEARCH BAR//

function fetchItems () {
    let searchContent = document.getElementById("searchbar").value
    let newUrl = "http://www.reddit.com/search.json?q=" + searchContent + "+nsfw:no"
    fetch(newUrl)
    .then(function(responseData){
        return responseData.json();  
    })
    .then(function(jsonData) {
        let results = jsonData.data.children[0].data.thumbnail
        /// remove search bar and directions///
        removeItems.removeChild(directions)
        removeItems.removeChild(search)
        removeItems.removeChild(searchbar)
            
        ///make images appear//
        jsonData.data.children.forEach(function(item) {
            foundImages.src = item.data.thumbnail;
            document.getElementById("itemsToRemove").appendChild(foundImages);
             // make slideshow//
             setInterval (function(), 2000, results)
        })
     })
    resetButton();
    }; 


 // reset button //
function resetButton () {
    //add reset Button ///
    let resetButton = document.createElement("button")
    document.getElementById("itemsToRemove").appendChild(resetButton)
    resetButton.innerText = "reset"
    // add Event Listener//
    resetButton.addEventListener("click", reset);
    // make resetn button work//
    function reset () {
        document.getElementById("itemsToRemove").removeChild(resetButton)
        removeItems.appendChild(directions);
        removeItems.appendChild(search);
        removeItems.appendChild(searchbar);
        document.getElementById("itemsToRemove").removeChild(foundImages)
    }
};
