// create a function to fetch Reddit API
const fetchReddit = (n) => {
    // make fetch happen
    const endpoint = `http://www.reddit.com/search.json?q=${n}+nsfw:no`

    //fetch requires the api url as an argument
    fetch(endpoint)
    .then(fetchObj=>fetchObj.json())
    .then(jsonData=>{
        addRedditImages(jsonData.data.children)
    })
    .catch(err=>console.log('There was an error fetching data:', err))
}

 const addRedditImages = (apiResults) => {
     for (let i = 0; i < apiResults.length; i++){
         // create a new img
        let newImg = document.createElement('img');
        //path way to the img
        newImg.src = apiResults[i].data.thumbnail;
        // set width and height for pic
        newImg.style.width = "300px";
        newImg.style.height = "300px";

        //append the image to slideshow
        document.querySelector('#slideshow').appendChild(newImg)
         }
}

const changeImage () => {
    currentImage = 
}




document.addEventListener('DOMContentLoaded', () => {
    let searchResult 

    document.querySelector('form').addEventListener('submit',(e) => {
        // prevent page refresh
        e.preventDefault();

        searchResult = document.getElementById('textArea').value

        // fetch the results
        fetchReddit(searchResult);
    })
})






















// // function to fetch Reddit API
// const fetchReddit = (n) => {
//     // make fetch happen
//     const endpoint = `http://www.reddit.com/search.json?q=${n}`;

//     fetch(endpoint) 
//     .then(function(responseData) {
//       return responseData.json();
//     })
//     .then(function(jsonData) {
//         let newArr = [];
//         let twoStep = jsonData.data.children;
//         twoStep.forEach(function(child) {

//             //path way to the url
//             let imgLink = child.data.thumbnail;

//             // IF the link ends with a jpg or jpeg add it to the new Arr
//             if (imgLink.endsWith("jpg")){
//                 newArr.push(imgLink)
//             }
//         })
//     });
// }


// const addImage = () => {
//     const newImgDiv = document.createElement("div")

//     newImgDiv.src
// }


// document.addEventListener('DOMContentLoaded', () => {
//     let searchResults
//     document.querySelector('form').addEventListener('submit', (e) => {
//         e.preventDefault();

//         searchResults = document.getElementById('textArea').value
//         fetchReddit(searchResults)

//     })
// })

