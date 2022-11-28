let d = document.getElementById("showmehideme");
let slideshowInterval
d.style.display = "none"; /////////this to hide div when page load
document.getElementById("button-addon2").addEventListener("click", clicksearch);
//document.getElementById("button-addon3").addEventListener("click", stopslideShow)
//document.getElementById("button-addon2").addEventListener("click", showhide);

let input = document.getElementById("form-control");
//console.log(input);
let slideShow = document.getElementById("button-addon3");
//mydiv = document.getElementById("showmehideme");
let reditImg = document.getElementById("reddit-image");
let images = [];
let show = true;
////create a new fuction to get the images
function getImages(data) {
  console.log(data.data.children);
  const children = data.data.children;
  ///testing the data
  ///children.map(element => {
  //console.log(element.data.url)

  ///})
  //////map
  const urls = children.map((element) => element.data.url);
  //console.log(urls);
  ////filter images that end with .jpg
  images = urls.filter((url) => url.endsWith(".jpg"));
  //console.log(images);
  reditImg.src = images[0];
}


function clicksearch() {
  ////gonna add everything here
  //console.log(input.value);
  showhide();
  //////changed the url to q = input.value
  const rediturl = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`;
  fetch(rediturl)
    .then((res) => res.json())
    .then((data) => {
      getImages(data);
      ////callback function
  
    });
    
}

function slideshow(){
  ///increment value
  if(imageIndex >= images.length)
  imageIndex = 0
}

/////////////////////////////////// Instructor Solution ///////////////////////////////////////////////////////
/*
let images = []
let imageIndex = -1
let value = ""
let slideshowInterval = null
const rediturl = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`;
  fetch(rediturl)
    .then((res) => res.json())
    .then(redditJson  => {
      console.log(redditJson.data.children)
      images = redditJson.data.children.map(child => {
        return{
          url:child.data.url,
          author: child.data.author,
          ups: child.data.ups,
          subreddit: child.data.subreddit
        }
      })

      //////filter
      .filter(images => {
       
        ///console.log(image.url.slice(-4))  filter the last four (if this is exactly equal to)
        const fileExtension = image.url.slice(-4)
        return fileExtension === ".jpg" || fileExtension === ".png"
      })



      console.log(images)

      //////////////////////add slideshow here
      slideshow()
      slideshowInterval = setInterval(slideshow, 5000)
    })
    .catch(console.warn)
///////////function to clear elememt
function clearElement(el){
  while(el.firstChild){
    el.removeChild(el.firstChild)
  }
}
    function slideshow(){
      ///increment value
      if(imageIndex >= images.length)
      imageIndex = 0
    }
    clear out the slideshow container
    clearElement(slideshowContainer)
//create the dom els we want
const newImage = document.createElement("img")
const newImage = document.createElement("h2")
const newImage = document.createElement("p")
const newImage = document.createElement("p")
///const newImage = document.createElement("")
///////set props of dom els
newImage.src = images[imageIndex].url
newImage.alt = value
image.width = "600"
newH2.innerText = images[imageIndex].author
newH2.innerText = images[imageIndex].subreddit
newH2.innerText = images[imageIndex].ups
//newH2.innerText = images[imageIndex].author
slideshowContainer.append(newImage, )

fuction stop(){

}


      ///check to makesure we are not out of bounds --- if so wrap back to 0

    }
      getImages(data);
      ////callback function
    });
}


*/
///////////////////////////////////////////
function showhide() {
  ////another way of hiding a div  writting if/else
  d.style.display = d.style.display !== "none" ? "none" : "block";
  input.style.display = d.style.display !== "none" ? "none" : "block";
  console.log("showhideworking");
  //if(d.style.display !== "none")(
}
