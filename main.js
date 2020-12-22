//page needs to load with a title

//website that I will use for the slidshowe
//www.reddit.com/search.json?q=cats+nsfw:no

let makeFetchHappen = () => {
    var input = document.getElementById('search').value
    var time = 3000;
    let i = 0;

    fetch(`http://www.reddit.com/search.json?q=${input}+nsfw:no`)
    .then(response => response.json())
    .then((data) => {

        let picture = data.data
        let img
        let urls = []
        console.log(picture)
        for (let i=0; i< picture.children.length; i++) {
            img = document.createElement("img")
            img.src = picture.children[i].data.url;
            urls.push(img)
            // slide.appendChild(src)
            // console.log(slide)
            
        } 
        
        function changeImg() {
            for (let i = 0; i < urls.length; i++) {
                img = document.createElement("img")
                document.getElementById('slides').append(urls[0])

            // img.src = picture.children[i].data.url;

            if(i < urls.length - 1) {
                i++;
            } else {
                i = 0;
            }
        }   
        }
       
        setTimeout(changeImg(), time);
        // window.onload = changeImg();
    })
    
}

// window.onload = changeImg();


//a button that clicks for starting the slideshow

document.getElementById('start').addEventListener("click", makeFetchHappen)

// //clear input field and div
// function stopAll() {
// document.getElementById('stop').reset();
// }