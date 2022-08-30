const form = document.querySelector('form')
const main = document.querySelector('.main')
const header = document.querySelector('.header')
const stopButton = document.querySelector('.stop')
let picsTimer;

let slideIndex = 0;

stopButton.addEventListener('click', () => {
    clearTimeout(picsTimer)
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    stopButton.style.display = "none"
    form.style.display = "block"            //brings search back button,search box and removes stop button
    header.style.display = "block"
    // console.log(form.children[0].firstElementChild)
})

function pictureSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; //runs a loop to keep creating slides
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    picsTimer = setTimeout(pictureSlides, 2000); //timer before next image is shown. 2 seconds
}

const redditFetch = (imagesFound) => {
    const redditUrl = `https://www.reddit.com/search.json?q=${imagesFound}&nsfw:no&type:image` //imagesFound is what the user puts into the search box

    fetch(redditUrl) //grabs reddit api
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            responseJson.data.children.forEach(post => {

                if(post.data.url.includes('.jpg') || post.data.url.includes('.png') || post.data.url.includes('.jpeg')) {
                    const imageDiv = document.createElement('div')
                    imageDiv.setAttribute('class', 'mySlides fade')
                    const img = document.createElement('img')
                    img.src = post.data.url
                    imageDiv.append(img)
                    main.append(imageDiv) //adds images to html to be shown to the user.
                }

            })

            stopButton.style.display = "block"
            form.style.display = "none"
            header.style.display = "none"       //reoves searchbox and adds the stop button
            pictureSlides()
        });
}

form.addEventListener("submit", event => {
    event.preventDefault()
    redditFetch(event.target[0].value)
})