/* eslint-disable */
$( document ).ready(function() {
  $('.go').click(go);
});

// addImages :: [String] -> Void
const addImages = function (srcList) {
  for (let i = 0; i < 10; i += 1) {
    $('#slideshow').append(`<div class="slideshow-height"><img src="${srcList[i]}"></div>`);
  }
};

// fetchPhotos :: String -> Void
const fetchPhotos = function (url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      const urls = myJson.data.children
                  .map((item) => item.data.url)
                  .filter((url) => url.includes('i.imgur'))
                  .map((url) => url.replace('gifv', 'gif'));

      addImages(urls);
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

// `https://www.reddit.com/search.json?q=${searchItem}+nsfw:no&limit=100&type=link`

// Click event for Go button
const go = function () {
  // $('#slideshow-container').addClass('slideshow-height');
  fetchPhotos('https://www.reddit.com/search.json?q=cats+nsfw:no&limit=100&type=link')

  $('#title').fadeOut(1000, function() {
    $(this).addClass('hide');
  });
  $('#input-row').fadeOut(1000, function() {
    $(this).addClass('hide');
  });

  $(this).switchClass('go', 'stop');
  $(this).text('STOP');
  $(this).off('click');
  $(this).click(stop);
};

// Click event for Stop button
const stop = function () {
  $('#slideshow-container').empty();
  $('#slideshow-container').append(`<div id="slideshow"></div>`);

  $('#title').fadeIn(1000, function() {
    $(this).removeClass('hide');
  });
  $('#input-row').fadeIn(1000, function() {
    $(this).removeClass('hide');
  });

  $(this).switchClass('stop', 'go');
  $(this).text('GO');
  $(this).off('click');
  $(this).click(go);
};

const startSlideshow = function () {
  $('#slideshow').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
};

