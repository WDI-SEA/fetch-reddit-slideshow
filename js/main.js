var button = document.getElementById("btn").addEventListener('click', search);
var stop = document.getElementById("stop").addEventListener('click', stop);
var input = document.getElementById('Enter');

var i = 0;
function search(e) {
  e.preventDefault();
  console.log(input.value)
  console.log("you")
  if( input.value === "cats"){
    document.getElementById("btn").style.display="none"
    document.getElementById("Enter").style.display="none"
fetch('http://www.reddit.com/search.json?q=cats+nsfw:no/results=')
  .then(function (data) {
    return data.json()
  })
  .then(function (json) {
    let displayCat = json.data.children.map(function (catPic) {

      return catPic.data.thumbnail;
    })
    console.log(displayCat)
    var image = document.createElement('img');
    image.src = displayCat[i];
    Results = document.getElementById("Results");
    Results.append(image);

   setInterval(function () {
      i++
      image.src = displayCat[i]
    }, 1000)
  })
} else{
  console.log("no access");
}

}

function stop() {
  Results.innerHTML = ""
  document.getElementById("Enter").style.display="inline"
  document.getElementById("btn").style.display="inline"
  console.log(button);
  input.value = null;
  i = 0;
  search();
  image.src = displayCat[0];
}

