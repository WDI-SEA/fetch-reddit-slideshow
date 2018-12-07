/* eslint-env jquery */
/* eslint no-use-before-define: 1 */

// --------------------------------------------------- //
// -------------------HEAVY HITTERS------------------- //
// --------------------------------------------------- //
/* #region */

// fetchPhotos :: String -> Void
const fetchPhotos = function (url) {
  fetch(url)
    .then(response => response.json())
    .then((myJson) => {
      const urls = redditImageFilter(myJson);
      if (urls.length < 1) {
        throw Error('Not enough images');
      } else {
        return urls;
      }
    })
    .then((imageUrls) => {
      // add images to hidden slideshow div and start slideshow
      addImages(imageUrls);
      startSlideshow();


      // Can this go somewhere else?
      return 0;
    })
    .then((x) => {
      // fade out loading icon div and fade in slideshow div
      $('#loader').removeClass('hide');
      toggleHide('#slideshow');

      $('#title div p').text('I want to see photos of:');
    })
    .catch((error) => {
      console.log(error);
      $('#title div p').text('Not enough images found. Try again!');
      retry();
    });
};

/* #endregion */


// --------------------------------------------------- //
// -------------------CLICK EVENTS-------------------- //
// --------------------------------------------------- //
/* #region */

// Click event for Go button
// go :: Event -> Void
const go = function (evt) {
  evt.preventDefault();

  // get search item and cancel if blank
  const searchItem = $('#search').val();
  if (searchItem === '') return;

  // Start image fetch
  // UPDATE TO ADD LOADING ICON HERE?
  fetchPhotos(`https://www.reddit.com/search.json?q=${searchItem}+nsfw:no&limit=100&type=link&sort=new`);

  // maybe add div with loading icon?
  // $('#slideshow-container').append('<div id="loading"><img src="slick/ajax-loader.gif"></div>');

  toggleHide('#title', '#input-row', '#loading');
  $('#loading').switchClass('small', 'big');
  switchButton('go', 'stop');

  // Reset search box to blank
  $('#search').attr('value', '');
};

// Click event for Stop button
// stop :: Event -> Void
const stop = function (evt) {
  evt.preventDefault();
  // Stop slideshow then reset
  $('#slideshow').slick('unslick');
  retry();
};

// const loading = function () {
//   // $('#slideshow').fadeIn(1000, function fadeAppend() {
//   //   $(this).append('<div class="hide" id="loading"><img src="slick/ajax-loader.gif"></div>');
//   // });
//   $('#slideshow').append('<div class="hide" id="loading"><img src="slick/ajax-loader.gif"></div>');
// };

/* #endregion */


// --------------------------------------------------- //
// ----------------DOM MANIPULATION------------------- //
// --------------------------------------------------- //
/* #region */

// Hide/Unhide
// toggleHide :: [...String:selector] -> Void
const toggleHide = function (...elements) {
  elements.forEach((elem) => {
    $(elem).fadeToggle(1000, function hide() {
      $(this).toggleClass('hide');
    });
  });
};

// Switch Go-Stop button
// switchButton :: String -> String -> Void
const switchButton = function (from, to) {
  $(`.${from}`).switchClass(`${from}`, `${to}`);
  $(`.${to}`).attr('value', `${to.toUpperCase()}`);
  $('.search-form').off('submit');

  if (to === 'go') {
    $('.search-form').submit(go);
  } else {
    $('.search-form').submit(stop);
  }
};

// Add images to DOM
// addImages :: [String] -> Void
const addImages = function (srcList) {
  srcList.forEach((src) => {
    $('#slideshow').append(`<div><img class="slides" src="${src}"></div>`);
  });
};

// Enable slick slideshow
// startSlideshow :: () -> Void
const startSlideshow = function () {
  $('#slideshow').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
    dots: false,
  });
};

// Go back to start (either from click or failed fetch)
// retry :: () -> Void
const retry = function () {
  // destroy slideshow and start over with empty one
  toggleHide('#slideshow')

  // $('#slideshow-container').empty();
  emptySlideshow('#slideshow-container');
  // $('#slideshow-container').append('<div class="hide" id="slideshow"></div>');

  toggleHide('#title', '#input-row');
  switchButton('stop', 'go');
};

// Fade out then delete
// fadeToEmpty :: String:selector -> Void
const emptySlideshow = function (elem) {
  $(elem).fadeToggle(1000, function hide() {
    $(this).empty();
    $(this).append('<div class="hide" id="slideshow"></div>');
  });
};

/* #endregion */


// --------------------------------------------------- //
// ----------------HELPER FUNCTIONS------------------- //
// --------------------------------------------------- //
/* #region */

// filter through reddit data to grab some usable images
// redditImageFilter :: json:Object -> [String]
const redditImageFilter = function (json) {
  return json.data.children
         .map(item => item.data.url)
         .filter(url => url.includes('i.imgur') || url.includes('i.red'))
         .map(url => url.replace('.gifv', '.gif'));
};

/* #endregion */


// --------------------------------------------------- //
// -------------------DOM LOADED---------------------- //
// --------------------------------------------------- //
/* #region */

$(document).ready(() => {
  $('.search-form').submit(go);
});

/* #endregion */
