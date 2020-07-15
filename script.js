
console.log("Reddit feed is ready to start 🌎")


const INTERVAL_DELAY = 2500
let currentImages = []
let currentIndex = 0
let interval = null


// 1)    Run Ajax and get JSON data

$(document).ready(function () {

    var request = $.ajax({
        url:  "http://www.reddit.com/search.json?q=cats+nsfw:no",
        type: "get",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });

// 2)  On click of this button Show me the Data

    $('#go').click(function () {
      var showData = $('#show-data');
  
      $.getJSON('example.json', function (data) {
        console.log(data);
  
        var items = data.items.map(function (item) {
          return item.key + ': ' + item.value;
        });
  
        showData.empty();
  
        if (items.length) {
          var content = '<li>' + items.join('</li><li>') + '</li>';
          var list = $('<ul />').html(content);
          showData.append(list);
        }
      });
  
      showData.text('Loading the JSON file.');
    });
  });


// 3) This is the Map of the data I want in the Json Object.

  function query() {
            
    currentImages = jsonData.data.children.map(p => {
        
    return {
        title: p.data.title,
        url: p.data.url,
        subreddit: p.data.subreddit,
        upvotes: p.data.ups,
        gold: p.data.gilded > 0 ? true : false,
        posthint: p.data.post_hint
}
    }).filter(p => {
    return p.posthint === 'image'
    })

    console.log('Cleaned up posts', currentImages)
    // Start the slideshow
    startSlideshow()
}









