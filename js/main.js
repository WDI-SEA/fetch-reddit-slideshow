
document.getElementById('cats-slide').addEventListener('submit', function(e) {

  e.preventDefault();

 
  var url = 'https://www.reddit.com/search.json?q=cats+nsfw:no';

    fetch(url)
    .then(function(data) {
      return data.json();
    })
    .then(function(json) {

      var newThumbs = json.data.children.map(function(thumb) {
    
        return thumb.data.thumbnail;
      });
    
        show.src = newThumbs[0];
        var imageIndex = 0;
        var handle = null;
        handle = setInterval(function() {
          imageIndex++;
          show.src = newThumbs[imageIndex];
        }, 3000);




  
      });
});
  
  
