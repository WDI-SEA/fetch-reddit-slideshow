document.addEventListener("DOMContentLoaded", function () {
    const stopButton = document.querySelector("#stop")
    const searchButton = document.querySelector("#search")
   
    const userInput = document.querySelector("#redditsearch")
    const results = document.querySelector("#results")
    // console.log(userInput)
    searchButton.addEventListener("click", function () {
        const url = `https://api.reddit.com/search.json?q=${userInput.value}+nsfw:no`
        // , {
        //     method: "GET",
        //     mode: "no-cors",
        //     headers: {
        //         "Content-Type": "application/json"
        //     
        fetch(url)
            .then(function (data) {
                //return data.json() // hi
                return data.json()
            })
            .then(function (jsonData) {
                 console.log(jsonData)
                for (const result of jsonData.data.children) {
                    if (result.data.thumbnail !== "self") {
                        const img = document.createElement("img")
                        img.src = result.data.thumbnail
                        img.style.width="150px"
                        results.append(img)
                        console.log(result.data.thumbnail)
                        
                    }
                    // something with the r) {
                        // something with the result
                }
                let nextIndex = 0
                setInterval(() => {
                    if (!jsonData.data.children[nextIndex] ) {
                        nextIndex = 0
                    }
                    const next = jsonData.data.children[nextIndex].data.thumbnail
                    if (next !== "self" && next !== "default" && next !== "spoiler") {
                        const image = document.querySelector("#bigimage")
                        image.src = next 
                    }
                    nextIndex = nextIndex + 1
                    
                    
                }, 1000)
            })
            .catch(console.warn)
        // for (let i = 0; i < list.length; i++) {
        // const result = list[i]
        //const img = document.createElement("img")
        //img.src = `${url}/j/${jsonData.id}.png`

    })
    while (results.firstChild) {
       results.removeChild(results.firstChild)
    }
})
