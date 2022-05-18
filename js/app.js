console.log("we here");

const button = document.querySelector("#submit");

// button.addEventListener("click", (e) => {
//   e.preventDefault();
//   const textInput = document.querySelector("#text-input");
//   const searchUrl = `https://www.reddit.com/search.json?q=${textInput.value}+nsfw:no`;
//   fetch(searchUrl)
//     .then((responseData) => responseData.json())
//     .then((jsonData) => {
//       console.log(jsonData.id);
//       jsonData.picture;
//       const picture = document.querySelector("#picture");
//       textInput.innerText = jsonData.picture;
//     })
//     .catch((err) => {
//       console.warn("uh oh", err);
//     });
// });

const imageUrl = "https://www.reddit.com/search.json?q=cats+nsfw:no";
document.addEventListener("DOMContentLoaded", () => {
  const imageList = document.querySelector("#text-input");
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const textInput = document.querySelector("#text-input");
    const peopleUrl = `https://www.reddit.com/search.json?q=${textInput.value}+nsfw:no`;
  });

  fetch(imageUrl)
    // //step two = jsonify data
    .then((responseData) => responseData.json())
    // // step three = do something with the data
    .then((jsonData) => {
      console.log(jsonData.data.children);
      const imageArray = jsonData.data.children;
      let imageUrlArray = imageArray.filter(isImage);
      console.log(imageUrlArray);

      function isImage(i) {
        return i.data.post_hint === "image";
      }

      imageUrlArray = imageUrlArray.map(isUrl)
      console.log(imageUrlArray)
      function isUrl(i) {
        return i.data.url;
      }
      
      document.querySelector('#picture').src = imageUrlArray[0]
    });
});

