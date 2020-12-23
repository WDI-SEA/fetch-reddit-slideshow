//Declaration of variables
const API_URL = 'https://www.reddit.com/search.json?limit=15&q=';
const INTERVAL_DELAY = 2000;

let currentImages = [];
let currentIndex = 0;
let interval;





    // call the fetch arguments with
// the then statements
const fetchFromReddit = (e) => {
    e.preventDefault();

    let query = document.getElementbyId('query').value;

    if (query){
        fetch(API_URL + query)
        .then(res => {
            res.json()
        
        .then(result => {
            let results = result.data.children
           console.log(results);
           currentImages = results.map(post => {
               return {
                   subreddit: post.data.subreddit,
                   title: post.data.title,
                   url: post.data.url.replace('.gifv', '.gif')
               };
           })
                .filter(item => {
                    return item.url.includes('i.imgur') || item.url.includes('i.redd');
                })
                currentIndex = 0;

                loadImage();
                
                clearInterval(interval);

                interval = setInterval(changeSlide, INTERVAL_DELAY);
            })
            .catch(err => {
                console.log('error', err);
            }) 
        })
    } else {
        console.log('Nothing to search! Womp Womp!!!');
    }
};
document.getElementById("search-form").addEventListener("submit")
)
document.getElementById('search-form').addEventListener('submit', fetchFromReddit);

const loadImage = () => {
    let slideshow = document.getElementById('slideshow');
    slideshow.innerHTML = '';
    let newImg = document.createElement('img');
    newImg.src = currentImages.url;

};

//in order to search and return assetts 

//MAYBE?? - extra RESET 
//WebGL libraries????