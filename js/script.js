const form = document.querySelector("#form");
const inputBox = document.querySelector("#inputBox");
const imageContainer = document.querySelector(".imageContainer");
const stopBtn = document.querySelector("#stopSlideShow");

let imageUrlArr = [];

let index = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  startShow(inputBox.value);
});

const fetchImages = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((resData) => {
      resData.data.children.forEach((child) => {
        imageUrlArr.push(child.data.url);
      });

      const filteredArr = imageUrlArr.filter((url) => {
        return (
          url.includes("jpg") ||
          url.includes("gif") ||
          url.includes("gifv") ||
          url.includes("png")
        );
      });

      const mappedArr = filteredArr.map((url) => {
        return url.replace(".gifv", ".gif");
      });
      imageUrlArr = mappedArr;
    })
    .catch((err) => console.warn(err));
};

const startShow = (userInput) => {
  form.classList.add("hide");
  stopBtn.classList.remove("hide");
  imageContainer.classList.remove("hide");
  //   inputBox.value = "";

  while (imageContainer.firstChild) {
    imageContainer.firstChild.remove();
  }
  const url = `http://www.reddit.com/search.json?q=${userInput}+nsfw:no`;
  fetchImages(url);

  setTimeout(() => {
    console.log(imageUrlArr);
    const img = new Image();

    img.src = imageUrlArr[index];
    img.alt = imageUrlArr[index];
    img.width = 200;
    img.height = 300;
    imageContainer.append(img);

    const slideShow = setInterval(() => {
      img.src = imageUrlArr[index];
      img.alt = imageUrlArr[index];
      if (index < imageUrlArr.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }, 1000);

    stopBtn.addEventListener("click", () => {
      form.classList.remove("hide");
      clearInterval(slideShow);
      stopBtn.classList.add("hide");
      imageContainer.classList.add("hide");

      imageUrlArr = [];
      console.log(imageUrlArr);
      index = 0;
    });
  }, 500);
};
