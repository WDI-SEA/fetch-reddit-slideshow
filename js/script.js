let hideOnClick = document.getElementById("hideOnClick");
let pageTitle = document.getElementById("pageTitle");
let hiddenPause = document.getElementById("hiddenPause");

const addSubject = (subject) => {
  let subjectList = document.getElementById("searchResults");
  let newSearch = document.createElement("li");
  newSearch.textContent = 
}

const redditSearchAddress = "http://www.reddit.com/search.json?q=cats+nsfw:no"

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    if(hideOnClick.style.display === "none") {
      hideOnClick.style.display = "flex";
    }else{
      hideOnClick.style.display = "none";
    }
    if(pageTitle === "Reddit Slideshow") {
      pageTitle = input;
    }else{
      pageTitle = "reddit slideshow"
    }
    if(hiddenPause.style.display === "none") {
      hiddenPause.style.display = "flex";
    }else {
      hiddenPause.style.display = "none";
    }
    e.preventDefault();
    while(subjectList.firstChild) {
      subjectList.removeChild(peopleList.firstChild);
    }

    fetch(redditSearchAddress+input+"nsfw:no")
    .then((searchList) =>{
      return searchList.json();
    })
    // .then(searchImageList) => {

    // }

  })
})