window.addEventListener("DOMContentLoaded", () => {
//store constant url for form dom element; request url
const requestUrl = "http://www.reddit.com/search.json?q=" //cats+nsfw:no"
let inputForm = document.querySelector("form")
let photoList = document.querySelector("#photoList")
let redditImg = []
let emptyImgSrc = document.getElementById("emptyImgSrc")

const imageTypes = [".jpg", "jpeg", ".png"]
// REQUEST DATA
    //take form element and prevent default behavior   (e)= the event that were listening for, allows you to manipuate default behavior
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault()
        //get user inputed text
        let userInput = input.value 
    //make fetch request to const api url with given user number
        fetch(requestUrl + userInput)
        //.then --> take response data and format
        .then((res) => {
            return res.json()  //console.log("response came back!!")
        })
        //.then --> use response JSON data
        .then((jsonData) => {
            photoRes = jsonData.data.children
            //domPhotoList(photoRes)
            // for (let i = 0; i < photoRes.length; i++) {
            //     if (photoRes[i].data.jpg
            //         console.log(photoRes[i].jpg)
            // }}
            //.filter(element => String(element.data.url_overridden_by_dest).includes(".jpg"))
            .map(filteredData => filteredData.data.url_overridden_by_dest)
            console.log(photoRes)
            for(let i =0; i < photoRes.length; i++) {
                let newImgSrc = photoRes[i].data.url
                if (newImgSrc.endsWith(".jpeg") || newImgSrc.endsWith(".png") || newImgSrc.endsWith(".jpg")) {
                    redditImg.push(newImgSrc)
                }
            }
            setInterval(function (){
                emptyImgSrc.src = redditImg[i];
                i++;
                //have we reached the ending index?
                if(i > redditImg.length){
                    i = 0;
                }
            }, 6000)
        })
        //.catch --> catch errors
        .catch((err) => {
            console.log(err)
            return err
        })
    })
    
//RESPONSE DATA





//     //collect formatted data
// function domPhotoList (photoRes) {
//     photoRes.forEach((cat) => {
//         console.log(cat.data.url)
//         //create an li element for each response 
//         let imgSrc = document.createElement("IMG")
//          imgSrc.src = cat.data.url //url_overridden_by_dest
//         // // add li element to DOM
//         setInterval(function catScrollingImg() {
//            if(cat.data.url) {
//                emptyImgSrc.src = cat.data.url
//         }}, 1000)
//         //photoList.appendChild(imgSrc)
//     })    
//     let button = document.querySelector("button")
//     button.addEventListener("click", clearInterval(catScrollingImg()))
// }

    
})
//jpg and png works results are good but seperate 