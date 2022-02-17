let getRedditPhoto = () => {
  let photoDiv = document.getElementById('photoDiv');
  let input = document.getElementById('textt').value;

  let reddit = `http://www.reddit.com/search.json?q=${input} photo+nsfw:no`;
  console.log(reddit);
  fetch(reddit) //fetch from reddit
    .then((fetchObj) => fetchObj.json()) //parse the data into json
    .then((jsonData) => {
      // do things with parsed data

      //scoped variables
      let allPhotos = jsonData.data.children;
      let photoArray = [];
      let photoIndex = 0;

      //this map creates my beautiful array of working images
      const map = allPhotos.map((element) => {
        if (element.data.url.charAt(10) === 'r') {
          photoArray.push(element.data.url);
        }
      });
      // This is my function which runs when my interval is initiated
      let pictureRotation = () => {
        if (photoDiv.firstChild) {
          photoDiv.removeChild(photoDiv.firstChild);
        }

        if (photoIndex > photoArray.length - 1) {
          photoIndex = 0;
        }
        let url = photoArray[photoIndex];
        let photo = document.createElement('img');
        photo.setAttribute("id", "photo")
        photo.setAttribute('src', url);
        photoDiv.appendChild(photo);
        photoIndex++;
      };
      // this is my interval timer
      pictureRotation();
      let timer = setInterval(pictureRotation, 3000);

      // This batch sets us up for the image rotating phase
      document.getElementById('title').style.display = 'none';
      document.getElementById('subtitle').style.display = 'none';
      document.getElementById('form').style.display = 'none';
      let stopButton = document.createElement('input');
      stopButton.setAttribute('type', 'submit');
      stopButton.setAttribute("class", "submit")
      stopButton.value = "return"
      stopButton.addEventListener("click", ()=>{
        document.getElementById('title').style.removeProperty("display");
        document.getElementById('subtitle').style.removeProperty("display");
        document.getElementById('form').style.removeProperty("display");
        stopButton.remove();
        document.getElementById("")
        photo.remove();
        document.getElementById("textt").value = ""
        clearInterval(timer);

      })

      let container = document.getElementById('container');
      container.appendChild(stopButton);
      
    });
};

// run JavaScript after the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  // start-up variables
  let submit = document.getElementById('submitt');

  // clicking the select button
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    getRedditPhoto();
  });
});
