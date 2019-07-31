console.log('Loaded')

document.getElementById('reddit').addEventListener('submit', function(e){
       // Stop the default behavior of form submission/refresh
    e.preventDefault();

    //Grab values from the text boxes
    var searchQuery = document.getElementById('query').value;
    // var userName = document.getElementById('username').value;
    console.log('Clicked the form!', userName);

    // Make sure form is not empty
    if (searchQuery) {
        console.log('Not empty!');
        document.getElementById('result-title').textContent = userName + '\'s Faves';

        //Perform fetch AJAX w/Fetch
        fetch('http://www.reddit.com/search.json?q=' +searchQuery)
        //https://www.reddit.com/r/videos/new.json?limit=25
        .then(function(responseData) {
           return(responseData.json());
        })
        .then(function(jsonData) {
            // Empty any previous results
            document.getElementById('result').innerHTML = ''
            // console.log('THE DATA', jsonData);
            //Iterate through each movie
            jsonData.Search.forEach(function(movie){
                console.log('Movie', movie);
                // Create a div to hld all info
                let divContainer = document.createElement('div');
                //Make an h3 tag for the title
                let h3Title = document.createElement('h3');
                h3Title.textContent = `(${movie.Year}) (${movie.Title})`; 
                // Add the info to the container div

                //Make an image for the movie poster
                let poster = document.createElement('img');
                poster.src = movie.Poster;
                poster.style.height = '150px';
                poster.style.width = 'auto';

                divContainer.append(h3Title);
                divContainer.append(poster);

                // Add the container div to some element that already lives in the DOM
                document.getElementById('result').append(divContainer);
            })
        })
    }
    else {
        console.log('empty :(');
        document.getElementById('result-title').textContent = 'Please Enter a Query';
    }
})