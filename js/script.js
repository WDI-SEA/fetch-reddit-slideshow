let hideOnClick = document.getElementById("hideOnClick");
let pageTitle = document.getElementById("pageTitle");
let hiddenPause = document.getElementById("hiddenPause");
let displayImage = document.getElementById("displayImage");
let funImages = [];
let singleImage = 0;
let timeFrame = 5000;

const redditSearchAddress = "http://www.reddit.com/search.json?q="


document.addEventListener("DOMContentLoaded", () => {
  search.addEventListener("submit", (e) => {
    console.log("hitting")
    if(hideOnClick.style.visibility != "hidden" &&
    hiddenPause.style.visibility != "visible"){
      hideOnClick.style.visibility = "hidden"
      hiddenPause.style.visibility = "visible"
      console.log("part 1")
    }
    displayImage.style.visibility = "visible"
    
    timeFrame = 5000
    console.log(timeFrame, "yen")

    let textInput = document.getElementById("textInput");

    pageTitle.innerText = textInput.value
    
    e.preventDefault();
    
    fetch(redditSearchAddress+textInput.value)
    .then((response) => {return response.json()}) 
    .then(data => {
      data.data.children.forEach(image => {
        funImages.push(image.data.url);
      })
      imageRevolver();
      console.log(timeFrame, "euros")
    })
    .catch((err) => {
      console.log("Failed to find results", err)
    })
  })
  console.log("soup")
})

hiddenPause.addEventListener("click", (e) => {
  console.log("WAP")
  funImages = []
  displayImage.src = ""
  displayImage.style.visibility = "hidden"
  pageTitle.innerText = "Reddit Slideshow"
  hideOnClick.style.visibility = "visible"
  hiddenPause.style.visibility = "hidden"
  textInput.value = ""
  console.log(timeFrame, "dollars")
})

const imageRevolver = () => {
  setInterval(()=> {
    if(funImages.length) {
      singleImage = (singleImage +1) % funImages.length;
      displayImage.src = funImages[singleImage];
    }
  }, timeFrame)
}