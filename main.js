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
        console.log(picture)
        for (let i=0; i< picture.children.length; i++) {
            let img = document.createElement("img")
            img.src = picture.children[i].data.url;
            document.getElementById('slides').append(img)
            // slide.appendChild(src)
            // console.log(slide)
        } 

        function changeImg() {
            if(i < picture.children.length - 1) {
                i++;
            } else {
                i = 0;
            }
        }
       
        setTimeout(changeImg(), time);
        
    })
    
}




//a button that clicks for starting the slideshow

document.getElementById('start').addEventListener("click", makeFetchHappen)

//make a timed slideshow
// var i = 0;
// var images = [];
// var time = 3000;

// //image list

// //change img
// function changeImg() {
//     document.img.src = picture.children[i].data.url;

//     if ()
// }

//clear input field and div
