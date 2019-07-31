console.log('loaded');

document.getElementById('slides-form').addEventListener('submit', getInput);


function getInput(e){
    e.preventDefault();
    let searchQuery = document.getElementById('query').value;
    console.log(searchQuery);

    if (searchQuery){
        fetch(`http://www.reddit.com/search.json?q=${searchQuery}+nsfw:no`)
        .then(function(responseData){
            return responseData.json();
        })
        .then(function(jsonData){
            console.log(jsonData);
            
            jsonData.data.children.forEach(post => {
                //console.log('post', post.data.post_hint)
                let divContainer = document.createElement('div');
                let image = document.createElement('img');
                image.src = post.data.url;
                image.style.height = '150px';
                image.style.width = '150px';
                

                //NEW CONTENT
                divContainer.append(image);
                document.getElementById('display').append(divContainer);
            })
        });

    }else {
        console.log('empty');
    }

 };
 
 
 
 
 
//  if (searchQuery){
        
//     document.getElementById('result-title').textContent = userName + `\'s Faves are`;
//     //PERFORM FETCH (AJAX request) 
//     fetch('http://www.omdbapi.com/?apikey=5ff4115f&s=' + searchQuery) 
//     .then(function(responseData){
//         return responseData.json();
//     })
//     .then(function(jsonData){
//         //EMPTY ANY PREVIOUS RESULTS
//         document.getElementById('result').innerHTML = '';
//         //ITERATE THROUGH EACH MOVIE 
//         jsonData.Search.forEach(movie => {
//         //CREATE A DIV TO HOLD ALL INFO
//         let divContainer = document.createElement('div');
//         //MAKE H3 FOR THE TITLE
//         // let h3Title = document.createElement('h3');
//         // //ADD THE INFO TO THE CONTAINER DIV
//         // h3Title.textContent = `${movie.Year} ${movie.Title}`;
//         //MAKE AN IMAGE FOR THE MOVIE POSTER
//         let poster = document.createElement('img');
//         poster.src = movie.Poster;
//         poster.style.height = '150px';
//         poster.style.width = 'auto';
//         //ADD THE CONTAINER DIV TO SOME ELEMENT THAT ALREADY LIVES IN THE DOM
//         divContainer.append(h3Title);
//         divContainer.append(poster);
//         document.getElementById('result').append(divContainer);
//         })
//     })
// }else {
//     //IF QUERY IS EMPTY ASK FOR A QUERY
//     document.getElementById('result-title').textContent = 'Please Enter a Query';
// }

