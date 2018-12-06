document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded!');
}
    


const ul = document.getElementById('form');
    

function show() {
    var current = $("div.current");
    
    current.fadeIn("slow");
    
    setTimeout("change()", 5000);
}

function loadImages(after) {
    var url = ` http://www.reddit.com/search.json?q=${userInput}`;
    
    if (after != null) {
        url = url + "&after=" + after;
    }
    
    if (typeof customUrl != "undefined") {
        url = url + "&url=" + customUrl;
    } else if (typeof subreddit != "undefined") {
        url = url + "&r=" + subreddit;
    }
    
    $.getJSON(url, function (data) {
        $("#images").empty();
        
        $.each(data.images, function(index, image){
            var carouselbox = $("<div>").attr("id", image.reddit_id);
            var link = $("<a>").attr("href", image.link).attr("title", image.title);
            var img = $("<img>").attr("src", image.url);
            var descr = $("<p>").text("Posted by " + image.author);
            
            $("#images").append(carouselbox.append($("<p>").append(link.append(img))).append(descr));
            
            $("#images div").hide();
            $("#images div:first").addClass("current");
        });
        
        show();
    })
}

document.getElementById("carouselbox");
        addEventListener('submit', function(e) {
        e.preventDefault();
        let userInput = document.querySelector('input').value;
        let requestURL = ` http://www.reddit.com/search.json?q=${userInput}`;

    
        fetch(requestURL)
        .then(function(responseData) {
            return responseData.json();
        })
        .then(function(jsonResults){
            console.log(jsonResults.url);
            jsonResults.forEach(loadImages);
        })
        .catch(function(error){
            console.log("Oh no! There has been an error!", error);
        });
    });
});


function change() {
    var current = $("div.current");
    var next = (current.next().length != 0) ? current.next() : false;
    
    current.fadeOut("slow", function () {
        current.removeClass("current");
        current.hide();
        if (next != false) {
            next.addClass("current");
            show();
        } else {
            loadImages(current.attr("id"));
        }
    });
}
    