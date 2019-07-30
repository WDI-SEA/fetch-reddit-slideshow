document.getElementById('photo-form').addEventListener('click', function(e) {
  //prevent default function of the submit button
  e.preventDefault();

  //getting the value for the search query
  var pics = document.getElementById('userInput').value

  //starting the hard stuff

  if (pics) {

    //Im starting the fetch request for reddit here
    fetch('https://www.reddit.com/search.json?q=' + pics + 'nsfw=no');
    console.log(pics)
    .then(function(responseData) {
      return responseData.json();
    })
    //.then()
  }
})
