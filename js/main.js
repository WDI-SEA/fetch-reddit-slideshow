var i = 0;

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





