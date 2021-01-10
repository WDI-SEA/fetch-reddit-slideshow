console.log("We good broskey!");
document.addEventListener('DOMContentLoaded', ()=>{
    console.log("seriously, bro we're good.")
})

const searchForm = document.getElementById('input');
const show = document.getElementById('theShow')
const stopBtn = document.getElementById('stop');
const searchInput = document.getElementById('submit');
let slideshow = [];
let currentIndex = 0;
let interval = null;

const fetchReddit = (searchTerm) => {
    fetch(`http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`)
    .then(response => response.json())
    .then(result => {
        let photosOnly = result.data.children.filter(child => {
            return child.data.post_hint === 'image';
        })
        slideshow = photosOnly;
        console.log(slideshow);
    })
    .then(() => {
        startShow()
    })
}

const search = (e) => {
    e.preventDefault();
    fetchReddit(searchForm.value);
    console.log("i work");
    
}

const startShow = () => {
    currentIndex = 0;
    let searchImg = document.createElement('img');
    searchImg.src = slideshow[0].data.url;
    searchImg.alt = slideshow[0].data.title;
    show.append(searchImg);
    interval = setInterval(() => {
        currentIndex++;
        if(currentIndex > slideshow.length -1){
            currentIndex = 0;
        }
        searchImg.src = slideshow[currentIndex].data.url;
        searchImg.alt = slideshow[currentIndex].data.title
    }, 3000)
}

const stopShow = () => {
    currentIndex = 0;
    clearInterval(interval);
}

searchInput.addEventListener('click', search);
stopBtn.addEventListener('click', stopShow);
//let pictures = []
//let i = 0
//let count = null
//function slides() {
//}
//function start() {
//
//}
//
//function pause() {
//
//}

//function knockItOff() {
//    clearInterval(count)
//