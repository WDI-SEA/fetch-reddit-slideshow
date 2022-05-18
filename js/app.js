let imgIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#submitBtn").addEventListener("click", (e) => {
    e.preventDefault();

    // console.log(`http:www.reddit.com/search.json?q=${textInput.value}+nsfw:no`);
    // console.log("hello");
    const rURL = `http:www.reddit.com/search.json?q=${textInput.value}+nsfw:no`;
    fetch(rURL)
      .then((responseData) => responseData.json())
      .then((jsonData) => {
        let imageArray = jsonData.data.children;
        let imageUrlArray = imageArray.filter(isImage);

        console.log(imageUrlArray);
        console.log(imageArray);

        // let img = new Image();
        // img.src = pimg;
        imageUrlArray = imageUrlArray.map(isUrl);
        function isUrl(i) {
          return i.data.url;
        }
        function isImage(i) {
          return i.data.post_hint === "image";
        }

        // let imageUrlArray[0]

        function moveImg() {
          //   imageUrlArray[i];
          if (imgIndex < imageUrlArray.length - 1) {
            imgIndex = imgIndex + 1;
          } else {
            imgIndex = 0;
          }

          //   console.log(imageUrlArray[i]);
          document.getElementById("img1").src = imageUrlArray[imgIndex];
        }

        setInterval(moveImg, 5000);
      })
      .catch((err) => {
        console.warn(err);
      });
    // fetch(dadJokesUrl, {
    //   headers: {
    //     Accept: "application/json",
    //   },
    // })
    //   .then((responseData) => responseData.json())

    //   .then((jsonData) => {
    //     console.log(jsonData);
    //     dadJokeP.innerText = jsonData.joke;
    //   })
    //   .catch((err) => {
    //     console.warn("uh oh, stinky");
    //   });
  });
});
