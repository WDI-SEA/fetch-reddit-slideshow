const API_URL = "http://www.reddit.com/search.json?Limit=15&q=";
constINTERVAL_Delay = 3000;

let currentImages = [];
let currentIndex = 0;
let interval;

const fetchFromReddit = e => {
    e.preventDefault();

    let query = document.getElementById("query").value;

    if(query) {
        fetch(API_URL + query)
        .then(res => {
            res.json(result => {
                let results = result.data.children
                console.log(results);
                currentImages = results.map(post => {
                    return {
                        subreddit: post.data.subreddit,
                        title: post.data.title,
                        url: post.data.url.replace(".gifv", ".gif")
                    };
                })
                .filter(item => {
                    return item.url.includes("i.imgur") || item.url.includes("i.redd");
                })
                currentIndex = 0;

                loadImage();

                clearInterval(interval);

                interval = setInterval(changeSlide, INTERVAL_DELAY);
            })
        })
    }
};

const loadImage = () => {
    let slideshow = document.getElementById("slideshow");
    slideshow.innerHTML = "";

    let newImg = document.createElement("img");
    newImg.src = currentImages[currentIndex].url;
    newImg.style.width = "300px";
    newImg.style.height = "auto";

    slideshow.append(newImg);

    document.getElementById("title").textContent = currentImages[currentIndex].title;

    document.getElementById("subreddit").textContent = currentImages[currentIndex].subreddit;
}

document.getElementById("search-form").addEventListener("submit", fetchFromReddit);