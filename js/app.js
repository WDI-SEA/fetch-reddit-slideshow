const requestUrl = "http://www.reddit.com/search.json?q=";
let arrayUrl = []

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("momma we made it");

    fetch(requestUrl+input.value)
      .then((responseData) => {
        // Fetch will package the response into an object with some methods that allow us to do some useful things with the response.
        // Use the .json() method to return the data in JSON format
        console.log(responseData)

        return responseData.json(getImage);
      })
      .then((jsonData) => {
 
        console.log("Json Data:")
        console.log("Here is the data:", jsonData)
        console.log('This is what i get',jsonData.data)
        for (i = 0; i < 8; i++) {
          arrayUrl.push(jsonData.data.children[i].data.url)
        }

       
        jsonData.data.children.forEach(getImage)
        console.log(arrayUrl)
      })
      .catch((error) => {
        console.log("Oh no, there's been an error!", error);
      });
  });



    const getImage = (imageObj) => {
        let newImage = document.createElement('img')
        // arrayUrl.push(imageObj.data.url)
        newImage.src = imageObj.data.url;
        photolist.appendChild(newImage)
    }
});


//taking the links and im setting an interval to rotate the images