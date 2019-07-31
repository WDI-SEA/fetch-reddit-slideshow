// https://www.reddit.com/search.json?q=cats+nsfw:no

const baseUrl = 'https://www.reddit.com/search.json?limit=100&q=nsfw:no+'; //just append search string to end.

let button = document.getElementById('search-button');
button.addEventListener('click', (e) => {
  e.preventDefault();
  let searchString = document.getElementById('search-box').value;
  let query = baseUrl + searchString;


  getData(query);

});

let getData = (query) => {
  try {
    fetch(query)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`Eh? ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then(function (response) {
        let imgUrlArray = getImageUrls(response); // console.log(`imgUrlArray is: ${imgUrlArray}`);
        let i = 1; // start at one so that left image isn't = -1 in the left image

        let interval = setInterval(function () {
          if (i < imgUrlArray.length) {
            // should handle broken links, but it doesn't.
            document.getElementById('center-image').src = `${imgUrlArray[i]}`;
            document.getElementById('left-image').src = `${imgUrlArray[i-1]}`;
            document.getElementById('right-image').src = `${imgUrlArray[i+1]}`;

            document.getElementsByTagName('form')[0].style.display = 'none';
            document.getElementById('image-wrapper').style.display = 'unset';
    
            i++;
          } else {
            i = 1;
          }
        }, 2000);
      })
  } catch (err) {
    // the fetch above doesn't seem to trigger the catch.
    console.log(`Caught error in try..catch:${err}`);
    document.getElementsByTagName('form')[0].style.display = 'none';
    document.getElementById('image-wrapper').style.display = 'unset';
  }
};

let getImageUrls = function (d) {
  let a = [];
  d.data.children.forEach(e => {
    if (e.data.preview) {
      a.push(e.data.preview.images[0].source.url.replace(/&amp;/g, '&'));
    }
  });
  return a;
};
