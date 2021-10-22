
// create a variables needed
const input = document.querySelector("input")

const requestUrl = "http://www.reddit.com/search.json?q="


// function that cycles through the links in the array and assigns them to source
document.addEventListener("DOMContentLoaded", ()=>{
    
    form.addEventListener("submit", (e)=> {
        e.preventDefault()
        // fetch data
        fetch(requestUrl+input.value)
        .then ((responseData) =>{
            console.log(responseData)
            return responseData.json()
        })
        .then((jsonData)=>{
            console.log(jsonData)
                // imageArray.push(jsonData.data.children[i].data.thumbnail)
                // console.log(jsonData.data.children)
                let imageArray = []
                jsonData.data.children.forEach(imageResults) 
                console.log(imageArray)   
                //     // imageArray.push(results.data.thumbnail)
                //     // data.children[9].data.author
                // })
                // console.log(imageArray)
                // // how do I retrieve thumbnails
                // // forEach, filter, map
            })
        // write a function to clear the form
        .catch((error)=>{
            console.log("Error")
            console.log(error)
        })
    })
})
const imageResults = imgObj => {

}
