document.addEventListener('DOMContentLoaded', main);

function main() {
  const regex = /.gif?v|.jpg|.png/gi;
  const ul = document.getElementById('searchResults');
  function clearOldSlideshow() {
    //check if there are children in UL and remove them
  }
  function fetchImage(image) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = cat.url;
    // instead of append to DOM, append to an array of img urls which can be read by
    // an interval listener
    ul.appendChild(li).appendChild(img);
  }

  document
    .getElementById('reddit-form')
    .addEventListener('submit', function(e) {
      e.preventDefault();
      let userInput = document.querySelector('input').value;
      let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no&limit=100`;

      clearOldSlideshow();

      fetch(requestURL)
        // Fetch will package the response data into some emthods that wil allow us
        // to do things with that response. The .json method
        .then(function(responseData) {
          return responseData.json();
        })
        .then(function(jsonData) {
          arrOfResults = jsonData.data.children;

          // arrOfResults.data.preview.images[0].source.url;

          arrOfUrls = arrOfResults
            .map(item => item.data.url)
            .filter(item => item.match(regex));

          console.log(arrOfUrls);
          // jsonData.forEach(imageUrl);
        })
        .catch();
    });
}
