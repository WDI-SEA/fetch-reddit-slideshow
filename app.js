document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector("#search");
  const stop = document.querySelector("#stop");
  const input = document.querySelector("#search-box");
  console.log(search, stop,);

  //const urlSearch = 
  
  fetch("https://www.reddit.com/search.json?q=cat+nsfw:no")
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.data.children[0].data);
      let images = [];
      data.data.children.forEach((image) => {
        images.push(image.data.url);
      });
      images.forEach((image) => {
        const imgCard = document.createElement("img");
        imgCard.src = image;
        console.log(image);
        document.querySelector(".image-wrapper").appendChild(imgCard);
      });
    });
  // const cars = ["honda, ford, toyota"];
  // cars.forEach((brand) => {
  //   console.log(car);
});
//add event listener
//
//while loop that rmoves child from div in lab notes
// while (jokeDiv.firstChild) {
//   jokeDiv.removeChild(jokeDiv.firstChild)
