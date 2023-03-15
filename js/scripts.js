const redditURL = "http://www.reddit.com/search.json?q=cats+nsfw:no";
const option = {
    header: {
        SameSite: "Lax",
    }
}
let search = true;
let urlDataArray = []

// fetch data into an array
    fetch (redditURL, option)
    .then(rawRedditData => rawRedditData.json())
    
    .then(jsonData => {
        let dataChildren = jsonData.data.children;
        childrenArray = jsonData.data.children;
        for (i = 0; i < childrenArray.length; i++) {
            let urlData = childrenArray[i].data.url
            urlDataArray.push(urlData)
        }
        console.log(urlDataArray);
        for (j = 0; j < urlDataArray.length; j++) {
            function appendImage () {
                let imageContainer = document.querySelector("#imageContainer");
                let image = document.querySelector("#image");
                image.src = "" + urlDataArray[j] + "";
                imageContainer.append(image);}
            setInterval(appendImage, 5000);
            }
        })
    .catch(console.warn)
    // create a function that loops through fetched array & append to body 


    // let imageSource = dataChildren.forEach().data.url;
    
    // const urlDataArray = urlData.map(function(taco){
        //     console.log(taco);
    //     return taco;
    // })
        


    
// set an interval to trigger loop &
// function slideShow () {
//     if (search === true) {
//         setInterval(imageSlideShow, 2000);
//     } else {}
// }  

// ad event listener to trigger slideshow
// slideShow()