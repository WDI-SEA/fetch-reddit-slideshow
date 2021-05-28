document.addEventListener("DOMContentLoaded", () => {

console.log("loaded")

// I can type in the form 

// variables
let inputForm = document.querySelector("form")
let input = document.querySelector("input")
const requestUrl = "https://www.reddit.com/search.json?q=" 
let catPics = document.querySelector('#catPics')
let catRes = []
// let endings = "jpg jpeg png"

console.log(input)
// prevents default form submission
inputForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    let userInput = input.value
    console.log(userInput)

fetch(requestUrl + userInput + "+nsfw:no")
  .then(res => {
    let jsonData = res.json()
    console.log(jsonData)
    return jsonData
  })
  .then(jsonData => {
      console.log(jsonData);
      let results = jsonData.data.children
      console.log(results)
  })
// make request
    // fetch(requestUrl + userInput + "+nsfw:no")
    //     .then(function(res) {
    //     })

        //  .then(function(jsonData) {
        //     let results = jsonData.data.children
            // domCatPics(catRes)
            // console.log(catRes)
        //  })        

        // .catch((err) => {
        //     console.log(err)
        //     return err
        // })

    function domCatPics(resArr) {
        resArr.forEach((catRes) => {
                // add li element
            // let li = document.createElement("li")
            // li.catRes.data.url
            for (let i = 0; i < results.length; i++) {
                if (results[i].data.url.endsWith(".jpeg") || results[i].data.url.endsWith(".png") || results[i].data.url.endsWith(".jpg")){
                    catRes.push(results[i].data.url)
                }
                // if (endings === true)
                // (catRes.results[i].data.url)
                // endings = true     
            }
        })
        
        // catList.appendChild(li)
    }
    document.getElementById("form").reset();

})

})