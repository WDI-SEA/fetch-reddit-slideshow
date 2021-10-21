const requestURL = "http://www.reddit.com/search.json?q="

document.addEventListener("DOMContentLoaded", () => {
   //when you use forms, use submit. This is default functionality of JS.
    form.addEventListener("submit", (e) => {
        //prevent browser refresh
        e.preventDefault()
        //fetch the data
        fetch(requestURL+document.getElementById('input').value)
        //console.log(requestURL+document.getElementById('input').value)
        .then((responseData)=> {
            //extract JSON data from the fetch object
            return responseData.json()
        })
        .then((jsonData) => {
            //the .then passed our returned json data into this call back
            console.log("Json data:")
            console.log(jsonData.data.children[1])
            //iterate through data for one person, element 0
            populateImage(jsonData.data.children[1])
           // jsonData.data.children.data.forEach(populateImage)

        })
        .catch((error) => {
            //if any error is sent back, you will have access to it here
            console.log ("error")
            console.log(error)
        })

    })

    //add image
    const populateImage = (search) => {
        //create a new image for each thumbnail
        const dogImg = document.createElement("img")
        dogImg.id = "dogPic"
        dogImg.src = search.data.thumbnail
        document.querySelector("#picture").appendChild(dogImg)


        // const dogImg = document.querySelector("#dogPic")
        // dogImg.src = search.data.thumbnail
    }

})

