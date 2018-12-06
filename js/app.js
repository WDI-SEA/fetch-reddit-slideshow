/* eslint-disable */

// fetch(url).then(function(response)).then(function(myJson)).catch(function(){});

// addImages :: [String] -> Void
const addImages = function (srcList) {
  for (let i = 0; i < 10; i += 1) {
    $('#slideshow').append(`<li><img src="${srcList[i]}"></li>`);
  }
};


// fetchPhotos :: String -> Void
const fetchPhotos = function (url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // const type = myJson.data.children[0].data.media.oembed.type;
      const thumbnailListFull = myJson.data.children.map((item) => {
        // if item.data.media.oembed.type === 'image'
        return item.data.thumbnail;//oembed.thumbnail_url;
      });
      console.log(thumbnailListFull);
      const thumbnails = thumbnailListFull.filter((url) => url.includes('https'));
      console.log(thumbnails);
      addImages(thumbnails);
      startSlideshow();
    })
    .catch(function (error) {
      console.log(error);
    })

};


// Set timeout on fetch... Needed??
const fetchWithTimeout = function (url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}

// Click event to start quote fetch!
// $('.go').on('click', function () {
//   fetchPhotos('http://www.reddit.com/search.json?q=cats+nsfw:no')
//   $(this).switchClass('go', 'stop');
//   $(this).text('STOP');
  
// });

// $('.stop').on('click', function () {
//   $('#slideshow').empty();
//   $(this).switchClass('stop', 'go');
//   $(this).text('GO');
// });



const go = function () {
  fetchPhotos('http://www.reddit.com/search.json?q=cats+nsfw:no')
  $(this).switchClass('go', 'stop');
  $(this).text('STOP');
};

const stop = function () {
  $('#slideshow').empty();
  $(this).switchClass('stop', 'go');
  $(this).text('GO');
};

const startSlideshow = function () {
$('#slideshow').lightSlider({
  auto: true,
  pause: 2000,
  gallery: false,
  item: 1,
  loop:true,
  slideMargin: 0,
});
};