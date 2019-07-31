// https://www.reddit.com/search.json?q=cats+nsfw:no

const BASEURL = 'https://www.reddit.com/search.json?limit=100&q=nsfw:no+'; //just append search string to end.
const INTERVAL = 2500;



document.getElementById('search-button').addEventListener('click', (e) => {
  e.preventDefault();
  let searchString = document.getElementById('search-box').value;
  let query = BASEURL + searchString;

  getData(query);

});

let getData = (query) => {
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
      setImage(imgUrlArray, i);
      let interval = setInterval(function () {
        if (i < imgUrlArray.length) {
          setImage(imgUrlArray, i);
          i++;
        } else {
          i = 1;
        }
      }, INTERVAL);

      document.getElementById('stop-button').addEventListener('click', (e) => {
        clearInterval(interval);
        document.getElementById('stop-button').style.display = 'none';
        document.getElementById('image-wrapper').style.display = 'none';
        document.getElementsByTagName('form')[0].style.display = 'unset';
        document.getElementById('title').style.display = 'unset';
      });
      
    })
    .catch(function (err) {
      console.log(`ERROR: ${err}`);
    });
};

let setImage = function (imgUrlArray, i) {
  // should handle broken links, but it doesn't.
  document.getElementById('center-image').src = `${imgUrlArray[i]}`;
  document.getElementById('left-image').src = `${imgUrlArray[i-1]}`;
  document.getElementById('right-image').src = `${imgUrlArray[i+1]}`;

  document.getElementsByTagName('form')[0].style.display = 'none';
  document.getElementById('title').style.display = 'none';
  document.getElementById('stop-button').style.display = 'unset';
  document.getElementById('image-wrapper').style.display = 'unset';
};

let getImageUrls = function (d) {

  // //incomplete in-clasee exempla using .map
  // let a = d.map(function(p) {
  //   return {
  //     url: p.data.url,
  //     post_hint: p.data.post_hint
  //   }
  // });
  // console.log(a);


  // my original extraction
  let a = [];
  d.data.children.forEach(e => {
    if (e.data.preview) {
      a.push(e.data.preview.images[0].source.url.replace(/&amp;/g, '&'));
    }
  });
  return a;
};
