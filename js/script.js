// Strict mode to throw exceptions, just in case.
"use strict";

// Variables
let btn = document.getElementById("loadQuote"),
  message = '',
  viewedQuotes = [];

// Fires a random quote/background color on page load
window.onload = (() => {
  getQuotes();
});

// Selects a rendom quote from the array in quotes.js
function getRandomQuote() {
  let randomQuote = Math.floor(Math.random() * quotes.length);
  var splicedQuote = quotes.splice(randomQuote, 1)[0];
  viewedQuotes.push(splicedQuote);
  if (quotes.length === 0) {
    quotes = viewedQuotes;
    viewedQuotes = [];
  }
  return splicedQuote;
}

// Prints quote to the HTML document within the element of id "quote-box"
function print(quote) {
  var outputDiv = document.getElementById("quote-box");
  outputDiv.innerHTML = quote;
}

// Selects a color from colors.js at random
function getRandomColor() {
  let randomColor = Math.floor(Math.random() * colors.length);
  return colors[randomColor];
}

// Prints quote to the DOM
function printQuote() {
  let quotes = getRandomQuote();
  message = '<div><p class="quote">' + quotes.quote + '</p></div>';
  message += '<div><br><p class="source">' + '&ndash; ' + quotes.source + '</p></div>';
  if (quotes.citation) {
    message += '<br><span class="citation">' + quotes.citation + '</span>';
  } else {
    message += '';
  }
  if (quotes.year) {
    message += ', <span class="year">' + quotes.year + '</span>';
  } else {
    message += '';
  }
  if (quotes.tag) {
    message += ', <span class="tag">' + quotes.tag + '</span>';
  } else {
    message += '';
  }
  // Prints final message to the DOM
  print(message);
  // Background color as well as the quote font color changes to the same color
  getRandomColor();
  document.body.style.backgroundColor = getRandomColor();
  document.body.style.color = document.body.style.backgroundColor;
}

let getQuotes = () => {
  fetch("http://www.reddit.com/search.json?q=programmerhumor+nsfw:no")
  .then((resp) => resp.json()) // Transform the data into json
  .then((data) => {
    let imagesDOM = document.getElementById("quote-box"),
      children = data.data.children;
      children.forEach((e) => {
        let imgURL = e.data.url,
          newImg = document.createElement("IMG"),
          setURL = newImg.setAttribute("src", imgURL);
        imagesDOM.appendChild(newImg);
      });
  })
  .catch(function(error) {
    // If there is any error you will catch them here
  });
  getRandomColor();
  document.body.style.backgroundColor = getRandomColor();
  document.body.style.color = document.body.style.backgroundColor;
};

// Listens for when the user clicks the button, then fires the printQuote function
btn.addEventListener("click", getQuotes, false);