document.addEventListener('DOMContentLoaded', main);

function main() {
  const imageEndings = /.gif?v|.jpg|.png/gi;
  const imageContainer = document.getElementById('image-container');

  function stopSlideshow() {
    //implement
  }

  function placeImages(arrOfUrls) {
    //find out if image-container has any children, if so remove them
    function placeSingleImage() {
      let imageToPlace = arrOfUrls.shift();
      console.log(imageToPlace);

      if (imageToPlace) {
        let img = document.createElement('img');
        img.src = imageToPlace;
        //   imageContainer.children.forEach()

        while (imageContainer.firstChild) {
          imageContainer.removeChild(imageContainer.firstChild);
        }

        imageContainer.appendChild(img);
      } else {
        stopSlideshow();
      }
    }

    setInterval(placeSingleImage, 2000);
  }

  document
    .getElementById('reddit-form')
    .addEventListener('submit', function(e) {
      e.preventDefault();
      let userInput = document.querySelector('input').value;
      let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no&limit=100`;

      //   clearOldSlideshow();

      fetch(requestURL)
        .then(responseData => responseData.json())
        .then(responseJson =>
          responseJson.data.children
            .map(child => child.data.url)
            .filter(url => url.match(imageEndings))
        )
        // .then(arrOfUrls => arrOfUrls.forEach(placeImage))
        .then(arrOfUrls => placeImages(arrOfUrls))
        .catch();
    });
}
