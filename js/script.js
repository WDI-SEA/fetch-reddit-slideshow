document.addEventListener('DOMContentLoaded', main);

let slideshow;

function main() {
  const imageEndings = /.gif$|.jpg$|.png$/gi;
  const imageContainer = document.getElementById('image-container');

  function placeImages(arrOfUrls) {
    function stopSlideshow() {
      clearInterval(slideshow);
    }

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
    if (slideshow) {
      clearInterval(slideshow);
    }
    slideshow = setInterval(placeSingleImage, 800);
  }

  document
    .getElementById('reddit-form')
    .addEventListener('submit', function(e) {
      e.preventDefault();

      let userInput = document.querySelector('input').value;
      let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no&limit=100`;

      fetch(requestURL)
        .then(responseData => responseData.json())
        .then(responseJson =>
          responseJson.data.children
            .map(child => child.data.url)
            .filter(url => url.match(imageEndings))
        ) // then
        .then(arrOfUrls => placeImages(arrOfUrls))
        .catch(function(error) {
          console.log('Your thing didnt do the thing right', error);
        });
    });
}
