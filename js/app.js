let img1 = document.getElementById("01")
let img2 =  document.getElementById("02")
let img3 = document.getElementById("03")

//--- mirror
let img4= document.getElementById("04")
let img5= document.getElementById("05")
let img6= document.getElementById("06")

let images = [];
let jpegs = [];
let url = "http://www.reddit.com/search.json?q="
let submit = document.getElementById('submitButton').addEventListener('click', () => {
    submitMe();
});



function fetcher(){
fetch(url)
 .then(function(responseData) {
     let jsonData = responseData.json()
     return jsonData;
 })
 .then(function(jsonData){
    jsonData.data.children.forEach(element => 
        images.push(element.data.url)
    );
    return checkUrl();
 })
 .catch(function(error) {
     console.log(error)
 })
}

function imageEditor(){
    const random = Math.floor(Math.random() * Math.floor(jpegs.length))
    const random2 = Math.floor(Math.random() * Math.floor(jpegs.length))
    const random3 = Math.floor(Math.random() * Math.floor(jpegs.length))
    if(random == random2){
        random2++
    } else {
        if(random2 === random3) {
            random3++
        } else {
            if(random == random3){
                random3++
            }
        }
    }
    img1.style.backgroundImage = 'url(' + jpegs[random] + ')'
    // img4.style.backgroundImage = 'url(' + jpegs[random] + ')'
    img2.style.backgroundImage = 'url(' + jpegs[random2] + ')'
    // img5.style.backgroundImage = 'url(' + jpegs[random2] + ')'
    img3.style.backgroundImage = 'url(' + jpegs[random3] + ')'
    // img6.style.backgroundImage = 'url(' + jpegs[random3] + ')'
}

setInterval(function(){ 
    console.log('hi')
    imageEditor(); }, 2500);

function checkUrl(){
  for(var i = 0; i < images.length; i++) {
    if(images[i].includes('jpg' || 'gif')){
     jpegs.push(images[i])
    }
  }
  imageEditor();    
} 

function submitMe() {
    images = [];
    jpegs = []
    url = "http://www.reddit.com/search.json?q="
    var value = document.getElementById('redditSearch').value;
    url += `${value}`;
    url += `&limit=40&nsfw=no`
    console.log(url)
    return fetcher(url);
}