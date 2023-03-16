// const redditURL = "http://www.reddit.com/search.json?q=cats+nsfw:no";
// const option = {
//     header: {
//         SameSite: "Lax",
//     }
// }
const imageContainer = document.querySelector("#imageContainer");
const image = document.querySelector("#image");
const searchSubmit = document.querySelector("#submitButton");
const searchValue = document.querySelector("#searchValue");
const imageDescription = document.querySelector("#imageDescription");
const headerTitle = document.querySelector("#headerOne")
const header = document.querySelector("#header")
const searchParent = document.querySelector("#searchParent")
let search = null;
let urlDataArray = []
let index = 0;


searchSubmit.addEventListener("click", e => {
    e.preventDefault();
    search = true;
    console.log("search button clicked")
    const redditURL = "http://www.reddit.com/search.json?q=" + searchValue.value + "+nsfw:no"
    imageDescription.innerText = ""
    headerTitle.innerText = ""
    searchParent.removeChild(searchValue);
    searchParent.removeChild(searchSubmit);
    stopSearch = document.createElement("button");
    stopSearch.innerText = "Stop";
    searchParent.append(stopSearch);
    // fetch data into an array
    fetch (redditURL)
    .then(rawRedditData => rawRedditData.json())
    
    .then(jsonData => {
        let childrenArray = jsonData.data.children;
        console.log(childrenArray)
        for (i = 0; i < childrenArray.length; i++) {
            let urlData = childrenArray[i].data.url
            if (urlData.endsWith(".jpg") || urlData.endsWith(".png")) {
                urlDataArray.push(urlData)
            } 
        }
        console.log(urlDataArray);
        image.src = urlDataArray[0];
        function appendImage () {
            index++;
            if (index >= urlDataArray.length) {
                index = 0; }
                image.src = urlDataArray[index];
                console.log("image src: " + image.src)
            }
           let slideShow = setInterval(appendImage, 5000);
            stopSearch.addEventListener("click", e => { 
                console.log("stop button clicked")
                imageDescription.innerText = "Search reddit images for something you enjoy! I like airplanes!";
                headerTitle.innerText = "Reddit Slideshow";
                searchParent.append(searchValue);
                searchParent.append(searchSubmit);
                searchValue.value = "";
                image.src = "https://images.squarespace-cdn.com/content/v1/5c3a41a5cef372cccbade42f/1675441170399-5W4197PUHT4D9V1TVC70/DSC07429.jpg?format=2500w"
                clearInterval(slideShow);
                searchParent.removeChild(stopSearch);
            })
        })
        .catch(console.warn)
        
})


    
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


// const redditURL = "http://www.reddit.com/search.json?q=cats+nsfw:no";
// const option = {
//     header: {
//         SameSite: "Lax",
//     }
// }
// let search = true;
// let urlDataArray = []

// // fetch data into an array
//     fetch (redditURL, option)
//     .then(rawRedditData => rawRedditData.json())
    
//     .then(jsonData => {
//         let childrenArray = jsonData.data.children;
//         console.log(childrenArray)
//         for (i = 0; i < childrenArray.length; i++) {
//             let urlData = childrenArray[i].data.url
//             urlDataArray.push(urlData)
//         }
//         console.log(urlDataArray);
//         function appendImage () {
//             let imageContainer = document.querySelector("#imageContainer");
//             let image = document.querySelector("#image");
//             for (j = 0; j < urlDataArray.length; j++) {
//                 image.src = "" + urlDataArray[j] + "";
//                 imageContainer.append(image);
//                 console.log("image src: " + image.src)
//             }
//         } 
//         setInterval(appendImage, 5000);
//         })
//     .catch(console.warn)