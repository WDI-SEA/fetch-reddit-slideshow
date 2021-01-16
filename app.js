let fotoIndex = 0; 
let btn = document.getElementById("btn");
let imgReturn = document.getElementById("slide");
let input = document.querySelector("input");
let fotos = [];
let stopBtn = document.getElementById("stopBtn");
let showSlideShow;

btn.addEventListener("click", function(e){
    e.preventDefault();
    console.log("text")
    fetch('http://www.reddit.com/search.json?q='+input.value+'+nsfw:no')
        .then(function(responseBtn){
            return responseBtn.json();
        })
        .then(function(jsonData){
            // imgReturn.innerText=jsonData.wolfPic
            console.log(jsonData.data.children)
            let image = jsonData.data.children.forEach(img => {
                // show if an image is a url string or default or self 
                if (img.data.thumbnail != "default" &&  img.data.thumbnail != "self") {
                    fotos.push(img.data.thumbnail)
                    
                }

            })
            console.log(fotos)
        })
        .then(() => {
            btn.style.display = "none";
            stopBtn.style.display = "block";
            showSlideShow = setInterval(() => {
                imgReturn.src = fotos[fotoIndex]
                imgReturn.style.display = "block";
                if(fotoIndex < fotos.length-1){
                    fotoIndex++
                } else {
                    fotoIndex = 0
                }
            }, 2000)
        })
        
})
// now render and image and specify the width and height too

stopBtn.addEventListener("click", () => {
    clearInterval(showSlideShow)
    btn.style.display = "block";
    stopBtn.style.diplay = "none";
})


function stopSlide () {
}  



// function slideShow () {
//     imgReturn.src = fotos[1];
// }

















// const API_URL= 'https://www.reddit.com/search.json?limit=15&q=';
// const INTERVAL_DELAY = 2000;
 
// let currentImages =[];
//  let currentIndex =0;
//  let interval;
 
//  const fecthFromReddit = e => {
//      e.preventDefault();

//      let query = document.getElementById('query').value;
//      if (query) {
//          fecth()
//      }
//  }
// const imgae








