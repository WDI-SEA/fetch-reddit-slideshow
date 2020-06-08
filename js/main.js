var submitBtn = document.getElementById("submit");
var form = document.getElementById("reddit-form");
var newResults = [];
var image = document.getElementById("imgid");
var stahp = document.getElementById("stahp");


fetchTheThings = function(e) {
    e.preventDefault();
    var link = `https://www.reddit.com/search.json?q=${e.target[0].value}+nsfw:no`
    fetch(link)
    .then(function(responseData) {
        return responseData.json();
    })
    .then(function(jsonData) {
        let results = jsonData.data.children
        for(i=0; i < results.length; i++) {
            newResults.push(results[i].data.url)
        }
        mapTheArray();
    })
    .catch(function(error){
        console.log(`🦖 ${error}`)
    })
}


form.addEventListener("submit", fetchTheThings)


/// map over newResults find things ending in .jpg

mapTheArray = function() {
  const map1 = newResults.filter(x => x.endsWith("jpg"))
  updatePhoto(map1);
}


/// cycle over the map1 array and set interval to cycle the url every 2 seconds
function updatePhoto(map1) {
    var photo = 0;
    var carosel = setInterval(cycle, 2000);
    function cycle() {
      if (photo == map1.length) {
        photo = 0
      }  else {
        photo++;
        image.src = map1[photo]
      }
    }

}

