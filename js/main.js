document.addEventListener("DOMContentLoaded",main);
var carousel = document.getElementById("main_carousel");

function main(){

 var search = document.getElementById("search").addEventListener("click",callFetch)

}


function callFetch(){
  var input = document.getElementById("text-field").value
  const URL = "https://www.reddit.com/search.json?q="+ input + "&limit=10";
  $('.carousel').carousel('pause');
  var oldSlides = document.getElementsByClassName("carousel-item");
  if(oldSlides){
    for (var j = 0; j < oldSlides.length; j++) {
      carousel.removeChild(oldSlides[j]);
    }
  }
  fetch(URL)
   .then(function(responseObject){
     return responseObject.json();
   })
   .then(function (jsonResults){
     	var resultsObjectsArr = jsonResults.data.children;
      var urls =  resultsObjectsArr.map(gettingUrl).filter(notDefined)
      return urls
   })
   .then(function(direction){
     for (var i = 0; i < direction.length; i++) {
       var divs = document.createElement("div");
       if(i === 0){
         divs.setAttribute("class", "carousel-item active")
       }else{
         divs.setAttribute("class", "carousel-item ")
       }
       var photo = document.createElement("img");
       photo.src = direction[i];
       photo.setAttribute("class", "d-block w-70");
       photo.setAttribute("width", "600px");
       photo.setAttribute("height", "400px");
       divs.appendChild(photo);
       carousel.appendChild(divs);
     }
     $('.carousel').carousel('cycle');
   })
   .catch(function(error){
     console.log("Something is wrong here is the error:", error);
   });
}


function gettingUrl(item){
  if(item.data.url.endsWith("jpg")){
    return item.data.url;
  }else{

  }
}

function notDefined(item){
  return !!item
}
