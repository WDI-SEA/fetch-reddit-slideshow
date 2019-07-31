console.log("hello");

document.getElementById('reddit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let searchReddit = document.getElementById('query').value;
    
    if(searchReddit) {
        console.log(searchReddit);
        document.getElementById('data').textContent = '';
    
        fetch('https://www.reddit.com/search.json?q=' + searchReddit)
            .then(function(resData) {
                console.log(resData);
                return resData.json();
            })
            .then(function(redditData){
                console.log(redditData);
                redditData.data.children.forEach(function(dataList) {
                    let divContainer = document.createElement('div');
                    let image = document.createElement('img');
                    

                    image.src = dataList.data.thumbnail;
                    document.getElementById('result').append(divContainer);
                    divContainer.append(image);

                })
            })
            .catch(function(error){
                document.getElementById('data').textContent = "There's been an error!";
                console.log("Oh no, there's been an error!", error);
            })

    } else {
        console.log("search for something!");
        document.getElementById('data').textContent = "Result not found!";
    }    
})
