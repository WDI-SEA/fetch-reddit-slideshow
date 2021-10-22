const requestUrl = "http://www.reddit.com/search.json?q=";

document.addEventListener("DOMContentLoaded", () => {
  let arrayUrl = [];
  let newImage = document.createElement('img')
  form.addEventListener("submit", (e) => {
    myFunction();
    myTitle();
    e.preventDefault();
    // console.log("momma we made it");

    fetch(requestUrl + input.value)
      .then((responseData) => {
        // Fetch will package the response into an object with some methods that allow us to do some useful things with the response.
        // Use the .json() method to return the data in JSON format
        console.log(responseData);

        return responseData.json();
      })
      .then((jsonData) => {
        console.log("Json Data:");
        console.log("Here is the data:", jsonData);
        console.log("This is what i get", jsonData.data);
        for (i = 0; i < 16; i++) {
          arrayUrl.push(jsonData.data.children[i].data.url);
        }

        sortedArray = arrayUrl.filter(itemsFromReddit);
        console.log(sortedArray);
        // jsonData.data.children.forEach(getImage);
        // newImage.src = sortedArray[]
        document.querySelector('.photolist').appendChild(newImage)
        console.log(arrayUrl);
        setInterval(slideShow, 3000)
      })
      .catch((error) => {
        console.log("Oh no, there's been an error!", error);
      });
  });

  const itemsFromReddit = (url) => {
    return url.includes(".jpg") || url.includes(".png");
  };
  
  
  start = 0

  function slideShow() {
    if(start < sortedArray.length) {
      newImage.src = sortedArray[start]
      start++
    }else {
      start = 0 
    }
  }


  function myFunction() {
    var x = document.getElementById("input");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function myTitle() {
    var xy = document.getElementById("title");
    if (xy.style.display === "none") {
      xy.style.display = "block";
    } else {
      xy.style.display = "none";
    }
  }

  
});

//taking the links and im setting an interval to rotate the images
//Find a way to hide the other three, while cycling which one is actually visible, changing the source of single
//imgag source