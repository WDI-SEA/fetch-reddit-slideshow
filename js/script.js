document.addEventListener('DOMContentLoaded', main);

let slideshow;

function main() {
  const imageEndings = /.gif$|.jpg$|.png$/gi;
  // const imageContainer = document.getElementById('image-container');

  // function placeImages(arrOfUrls) {
  //   function stopSlideshow() {
  //     clearInterval(slideshow);
  //   }

  //   //find out if image-container has any children, if so remove them
  //   function placeSingleImage() {
  //     let imageToPlace = arrOfUrls.shift();
  //     console.log(imageToPlace);

  //     if (imageToPlace) {
  //       let img = document.createElement('img');
  //       img.src = imageToPlace;
  //       //   imageContainer.children.forEach()

  //       while (imageContainer.firstChild) {
  //         imageContainer.removeChild(imageContainer.firstChild);
  //       }

  //       imageContainer.appendChild(img);
  //     } else {
  //       stopSlideshow();
  //     }
  //   }
  //   if (slideshow) {
  //     clearInterval(slideshow);
  //   }
  //   slideshow = setInterval(placeSingleImage, 800);
  // }

  function clearCarousel() {
    let carouselParent = document.querySelector('.carousel');
    while (carouselParent.firstChild) {
      carouselParent.removeChild(carouselParent.firstChild);
    }
    clearInterval(slideshow);
  }
  function createCarouselItem(resultUrl) {
    //create an anchor tag
    let newAnchor = document.createElement('a');
    //create an image tag
    let newImg = document.createElement('img');
    //add # href to anchor tag
    newAnchor.href = '#';
    // add carousel item class to anchor
    newAnchor.classList.add('carousel-item');
    // add src to img tag
    newImg.src = resultUrl;
    //append img tag to anchor tag
    newAnchor.appendChild(newImg);
    //append anchor tag to carousel div
    document.querySelector('.carousel').appendChild(newAnchor);
  }
  function startCarousel() {
    slideshow = setInterval(function() {
      M.Carousel.getInstance(document.querySelector('.carousel')).next();
    }, 3000);
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
        .then(arrOfUrls => {
          clearCarousel();
          arrOfUrls.forEach(createCarouselItem);
        })
        .then(() => {
          //Carousel code from Materialize
          var elems = document.querySelectorAll('.carousel');
          // eslint-disable-next-line
          var instances = M.Carousel.init(elems);

          startCarousel();
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log('Your thing didnt do the thing right', error);
        });
    });
}
