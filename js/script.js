//get reddit url
const url = "http://www.reddit.com/search.json?q=nsfw:no"

//all of it in DOMContentLoaded
document.addEventListener("DOMContentLoaded",function(){
  //used later for setInterval and clearInterval
  let interval;
  //select image container
  const imagesContainer = document.querySelector("#images-container")
  //fetch reddit API
  fetch(url)
  //proccess it to json
  .then(function(rawResponsData){
      return rawResponsData.json() 
  }) //takes jsonData
  .then(function(jsonData){

    console.log(jsonData);
  })
  //submit form
  document.querySelector("#searchForm").addEventListener("submit", function(e){
      //stops page from refreshing
    e.preventDefault()
      //get the search term from user
      const searchTerm = document.querySelector("#searchInput").value
      //concat the search term onto the link
      const userSearch = "http://www.reddit.com/search.json?q=nsfw:no+" + searchTerm;
      //fetch api with user search (maybe dont need fetch uptop actually)
      fetch(userSearch)
      //proccess to json
      .then(rawResponse => rawResponse.json()) 
      //filter it
      .then(jsonData => {
        //if theres no preview dont take it
          const posts = jsonData.data.children.filter(post => {
              // check if post has a preview image
              if (!post.data.preview) {
                return false;
              }
            
              //takes the extension from the link
              const urlParts = post.data.url.split('.');
              const extension = urlParts[urlParts.length - 1];
            
              // check if file extension is .png or .jpg
              if (extension === 'png' || extension === 'jpg') {
                return true;
              }
            
              // if it's not a .png or .jpg, most likley cant use it so dont
              return false;
            });
          //stop any intervals running before images reset
          clearInterval(interval);
          imagesContainer.innerHTML = "";
          let index = 0;
          let currentImage;

          interval = setInterval(() => {
            const post = posts[index];

            // remove the previously displayed image
            if (currentImage) {
              imagesContainer.removeChild(currentImage);
            }

            // create a new image element for the current post
            const img = document.createElement("img")
            img.src = post.data.url
            currentImage = img;
            imagesContainer.appendChild(img);

            index++;

            // reset the index to loop through the posts array again
            if (index >= posts.length) {
              index = 0;
            }
          }, 5000); // show each image for 5 seconds
            //make button reappear
          resetButton.style.display = "block";
      })
  })
 //reset button code
  const resetButton = document.querySelector("#resetButton");
  resetButton.addEventListener("click", function() {
    clearInterval(interval);
    imagesContainer.innerHTML = "";
    console.log('clicking');
    document.querySelector("#searchForm").style.display = "block";
    resetButton.style.display = "none";

  });
})
//final product looks gross didnt have time to css it
//will pay close attention in code along, this was pain.