var searchBar = document.getElementById("searchBar");
var submitButton = document.getElementById("submit");
var title = document.getElementById("title");
var description = document.getElementById("description");
var form = document.getElementById("form");
var slideShow = document.getElementById("slideshow");
var clear = document.getElementById("clear");
var list = [];
var counter = 0;
var intervals = setInterval(slides, 1000);

clear.style.display = 'none'
form.addEventListener('submit', function(e) {
    e.preventDefault();
    clear.style.display = 'block'
    var searchInput = form.searchbar.value;
    searchBar.style.display = "none";
    submitButton.style.display = "none";
    title.style.display = "none";
    description.style.display = "none";
    fetch(`https://www.reddit.com/search.json?q=${searchInput}+url:.jpg+nsfw:no`)
    .then(function(responsedata){
        return responsedata.json()
    })
        .then(function(jsonData){
            let results = jsonData.data.children.map(function(searchResult){
            let usefulStuff ={
                url:searchResult.data.url
            }
            return usefulStuff
            })
            let i=0
            while (i<results.length){
                list.push(results[i])
                i++ 
            }
        })
})

function slides(){
slideShow.innerHTML ='<img src=' + list[counter].url+ '></img>'
counter++
console.log(counter);
if (counter>=list.length){
    counter = 0;
}
}
clear.addEventListener("click",function(){
    clearInterval(intervals);
    slideShow.innerHTML =''
    searchBar.style.display = 'unset'
    submitButton.style.display = 'unset'
    title.style.display = 'block'
    description.style.display = 'block'
    clear.style.display = 'none'
    list = [];
    counter=0;
    document.getElementById("form").reset();
})
            
            


