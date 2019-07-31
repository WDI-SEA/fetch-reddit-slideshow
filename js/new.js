 console.log('loaded');
document.getElementById('slides-form').addEventListener('submit', getInput);
             
    function getInput(e){
    e.preventDefault();
        let searchQuery = document.getElementById('query').value;
        //console.log(searchQuery);
             
    if (searchQuery){
        fetch(`http://www.reddit.com/search.json?q=${searchQuery}+nsfw:no`)
        .then(function(responseData){
        return responseData.json();
})
        .then(function(jsonData){
            console.log(jsonData);
            let imageArray = []; 
            let newArray = imageArray.filter(img => img.preview);
            jsonData.data.children.forEach(post => {
            //console.log('post', post.data.post_hint)
                
                let divContainer = document.createElement('div');
                let image = document.createElement('img');
                let poster = post.data.url;
                    image.style.height = '150px';
                    image.style.width = '150px';


                        imageArray.push(poster);
                        
                        slidesInterval();
                   
                        function slidesInterval(){
                        setInterval(newArray.forEach(entry=> {
                            divContainer.append(entry);
                            document.getElementById('display').append(divContainer)
                        }), 3000)
                }
            })
           
            console.log(imageArray);
        });
    }else {
        console.log('nothing in query');
    }
}