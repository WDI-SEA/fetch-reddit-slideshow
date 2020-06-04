console.log("Don't worry you're ok!")
var images = []
images[0] = "https://i.redd.it/168x8r17d0251.jpg"

let time = 0
// i tapped out at 2.5 hours i freaking hate js











// timer function - for the picture totating
// setInterval()
function pictureChange() {  }
  setInterval(function() {
    console.log(time)
    time++

  }, 10000)
  












































// where to rip pictures
fetch('https://www.reddit.com/search.json?q=nature')
    .then(function(responseData){
        return responseData.json()
    })
    .then(function(jsonData) {
        //do stuff wit data
        console.log(jsonData);
        //iterate through results
let results = jsonData.data.children

        for (let i =0; i < results.length; i++){
        //console logf the title and url
        console.log(jsonData.data.children[i].data.title)
        console.log(jsonData.data.children[i].data.url)
        }
    })
    .catch(function(error) {
        console.log("💟")
        console.log(error)
    })  //primese syntax
    console.log("finsihed the code")