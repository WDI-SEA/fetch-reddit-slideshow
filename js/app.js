/* eslint-disable */
$( document ).ready(function() {
  $('.search-form').submit(go);
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
      if (urls.length < 10) {
        throw 'Not enough images';
      }

      addImages(urls);
      startSlideshow();
    })
    .catch(function (error) {
      console.log(error);
      $('#title div p').text("Not enough images found. Try again!");
      retry();
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

// Click event for Go button
const go = function (evt) {
  evt.preventDefault();
  const searchItem = $('#search').val();
  if (searchItem === '') return;
  fetchPhotos(`https://www.reddit.com/search.json?q=${searchItem}+nsfw:no&limit=100&type=link`)

  $('#search').attr('value', '');

  $('#title').fadeOut(1000, function() {
    $(this).addClass('hide');
  });
  $('#input-row').fadeOut(1000, function() {
    $(this).addClass('hide');
  });

  $('.go').switchClass('go', 'stop');
  $('.stop').attr('value', 'STOP');
  $('.search-form').off('submit');
  $('.search-form').submit(stop);
};

// Click event for Stop button
const stop = function (evt) {
  evt.preventDefault();
  $('#slideshow').slick('unslick');
  retry();
};

const retry = function () {
  $('#slideshow-container').empty();
  $('#slideshow-container').append(`<div id="slideshow"></div>`);

  $('#title').fadeIn(1000, function() {
    $(this).removeClass('hide');
  });
  $('#input-row').fadeIn(1000, function() {
    $(this).removeClass('hide');
  });

  $('.stop').switchClass('stop', 'go');
  $('.go').attr('value', 'GO');
  $('.search-form').off('submit');
  $('.search-form').submit(go);
};


const startSlideshow = function () {
  $('#slideshow').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false,
    fade: true,
    cssEase: 'linear',
    dots: true,
    centerMode: true,
    mobileFirst: true,
    respondTo: 'min',
  });
};

