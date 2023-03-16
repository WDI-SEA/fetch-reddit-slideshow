const searchButton = document.getElementById("searchButton");
const slideshowObj = {};
searchButton.addEventListener("click", () => {
    alert("You clicked me!");
    const userInput = document.getElementById("searchInput");
    alert(userInput.value);
    const textValue = userInput.value;
    fetch(`http://www.reddit.com/search.json?q=${textValue}+nsfw:no`)
    .then(res => res.json())
    .then((data) => {
        data.data.children.map((individualData, index) => {
            const singleData = data.data.children[index].data
            slideshowObj.title = singleData.title;
            slideshowObj.author = singleData.author;
            slideshowObj.subreddit = singleData.subreddit;
            slideshowObj.thumbnail = singleData.thumbnail;
        })
        const img = document.querySelector("img")
        img.src = slideshowObj.thumbnail
    })
});

const slideshow = document.querySelectorAll('[data-componant="slideshow"]')
slideshow.forEach(function initSlideShow(slideshow) {
    let slides = document.querySelectorAll(`#${slideshow.id} [role="list"].slide`)
    const index = 0, time = 4000;

    slides[index].classList.add("active")
    setInterval( () => {
        console.log("hi") 
        slides[index].classList.add("active")
        if (index === slides.length)
        index = 0
        slides[index].classList.add("active")
    }, time)
})

