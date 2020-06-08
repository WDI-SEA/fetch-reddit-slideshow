
document.addEventListener("DOMContentLoaded", function(){
    const btn = document.getElementById('btn');
    const slideImg = document.getElementById('slideImg');
    const searchInput =document.getElementById('input').value;
    const url = `https://www.reddit.com/search.json?q=${searchInput}+nsfw:no`; 
    let searchResult = [];
    let searchImg = [];
    btn.addEventListener('click', addImg(searchResult));
    function addImg(searchResult) {
        
        fetch(url) 
            .then(function(responseData) {
                return responseData.json();
            })
            .then(function(jsonData) {
                // console.log(jsonData);
    //  find result in jsonData
                searchImg = jsonData.data.children;
                 console.log(searchImg);
                for (let i=0; i<searchImg.length; i++) {
                    if (searchImg[i].data.thumbnail.endsWith("jpg")) {
                        searchResult.push(searchImg[i].data.thumbnail);
                    }   
                }
                // console.log(searchResult);
                for (let j=0; j<searchResult.length; j++) {
                    let getImg = document.createElement("img");
                    getImg.setAttribute('src', searchResult[j]);
                    slideImg.appendChild(getImg);
                }
            })
            .catch(function(error) {
                    console.log("Oh no, there's been an error!", error);
            })
    }
})
