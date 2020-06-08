
console.log("👾")
const userInput = document.getElementById("userInput").innerText

startShow = function() {
    fetch("https://www.reddit.com/search.json?q=`${userInput}`")
    .then(function(responseData){
        let jsonedData = responseData.json()
        return jsonedData;
    })
    .then(function(jsonData){
        let results = jsonData.data.children.url
        let images = results[i].data.endsWith(".jpg")
        for (let i = 0; i < results.length; i++) {
            (function(n) {
                setTimeout(function(){
                    console.log(images)
                }, 5000)
            })
            //console.log(results[i].data.url)
        }
        document.getElementById("image-gallery").style.backgroundImage = images[i]
    })
    .catch(function(error){
        console.log("💩");
        console.log(error);
    })
}
document.getElementById("submit").addEventListener('click', startShow());