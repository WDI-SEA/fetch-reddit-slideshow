const imageArray = [];
// Array that is filtered to only include images that are able to be loaded
let filteredArray = [];
const submit = document.getElementById("submit")
// URL to do fetch from
const requestUrl = "https://www.reddit.com/search.json?q="

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Hides/changes styling & elements from page when Submit button clicked
        input.style.display = "none"
        submit.style.display = "none"
        document.querySelector("p").style.display = "none"
        document.querySelector("h1").style.display = "none"
        document.body.style.backgroundColor = "black"
        // Takes in input from input field and adds on to end of fetch URL
        fetch(requestUrl + input.value)
            .then(function (responseData) {
                return responseData.json();
            })
            .then(function (jsonData) {
                // Loops through the json data and pulls in images, pushing into array
                for (let i = 0; i < 20; i++) {
                    console.log(jsonData.data.children[i].data.url)
                    imageArray.push(jsonData.data.children[i].data.url)
                }
                // Filters array to only include images that are able to be displayed
                // Checks to make sure they're not gifs
                const ext = ".jpg"
                filteredArray = imageArray.filter(function (link) {
                    return link.indexOf(ext) !== -1 && link.includes("redd.it")
                })
                // addImages function call, after click 
                addImages()
            })
            .catch((error) => {
                console.log("ERROR!!!")
                console.log(error)
            })
    })
    // Loops through filtered array and creates img element, resizes it, and appends to the displayImages div in the HTML
    const addImages = () => {
        for (let i = 0; i < filteredArray.length; i++) {
            let img = document.createElement("img")
            img.src = filteredArray[i];
            img.style.width = "25%"
            img.style.height = "auto"
            displayImages.appendChild(img)
        }
    }
})

// const slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   const slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   slides[slideIndex-1].style.display = "block";  
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }