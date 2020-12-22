let urlArray = [];
let globalIndex = 0;
let url;

const makeFetchHappen = (event) => {
    event.preventDefault() 
    let searchBtn = document.getElementById('search').value
    console.log("http://www.reddit.com/search.json?q=" + searchBtn + "+nsfw:no");
    url = "http://www.reddit.com/search.json?q=" + searchBtn + "+nsfw:no"
    fetch(url)
    .then(response => response.json())
    .then(redditData =>{
        console.log(redditData);
        listImages(redditData.data.children);
    })
}

document.getElementById('searchForm').addEventListener('submit', makeFetchHappen);

let listImages = (imageList) => {
    imageList.forEach(image => {
        // let listImages = document.createElement('div');
        // // listImages.innerText = image.data.url
        // document.getElementById('slideshowContainer').appendChild(listImages);
        urlArray.push(image.data.url)
    });
    setInterval(imgRotation, 2500) 
}

const imgRotation=()=> {
    document.getElementById('img').src=urlArray[globalIndex]
    globalIndex+=1
    if (globalIndex >= 25) {
        globalIndex = 0
    }
}

// let test = document.getElementById('startButton').addEventListener('click', (event) => {
//     event.preventDefault()

//     let searchBtn = document.getElementById('search').value
//     console.log("http://www.reddit.com/search.json?q=" + searchBtn + "+nsfw:no");
//     url = "http://www.reddit.com/search.json?q=" + searchBtn + "+nsfw:no"
// })

//imgRotation 
//use setInterval, 2 arguments- function and timing

// //js object literal is a container of data - key value pairs
//examples during one on one with weston to help me with comprehension
// let obj = {
//     key1: "value1",
//     key2: "value2",
//     key3: "value3",
//     key4: [
//         "cat",
//         "dog"
//     ],
//     key5: {
//         innerKey1: "valueInner",
//         innerKey2: [
//             "ice cream",
//             "tacos"
//         ]
//     }
// }
// console.log(obj.key5.innerKey2[0]);