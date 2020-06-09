
document.addEventListener("DOMContentLoaded", function(){
    const btn = document.getElementById('btn');
    const slideImg = document.getElementById('slideImg');  
    let searchResult = [];
    let searchImg = [];
    btn.addEventListener('click', addImg);
    function addImg() {
        const searchInput =document.getElementById('input').value;
        // console.log(searchInput);
        const url = `https://www.reddit.com/search.json?q=${searchInput}+nsfw:no`; 
        // console.log(url);
        fetch(url) 
            .then(function(responseData) {
                return responseData.json();
            })
            
            .then(function(jsonData) {
                // console.log(jsonData);
    //  find result in jsonData
                searchImg = jsonData.data.children;
                //  console.log(searchImg);
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
                setInterval(slideImg, 20);
            })
            .catch(function(error) {
                    console.log("Oh no, there's been an error!", error);
            })
    }

    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener('click', resetPage);
    function resetPage() {
        slideImg.innerHTML = '';
        clearInterval(interval);
    }   
})

