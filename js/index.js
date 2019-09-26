
$('#submit1').on('click', function() {
    event.preventDefault();
    let $input = $('#input').val();
    fetch(`http://www.reddit.com/search.json?q=${$input}+nsfw:no`)
    .then(function(responseData) {
        return responseData.json();
    })
    .then(function(jsonData) {
            let myMap = jsonData.data.children.map(function(searches) { 
                if(searches.data.url.includes('jpg') || searches.data.url.includes('png')) {
                    return searches.data.url
                }
        })      
            let betterMap = myMap.filter(function(ele) {
            return typeof ele !== 'undefined';
        })
        console.log(betterMap)
        console.log($input)
        let picture = 0;
        // console.log("MY MAP: ", myMap)
        setInterval(function(){
            let image = document.querySelector('#image')
            image.setAttribute('src', betterMap[picture])
            if (picture <= betterMap.length) {
                picture++;
            }
            console.log(picture);
        }, 2000)
    })
    
})
