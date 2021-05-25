document.addEventListener("DOMContentLoaded", () => {
    // store constant url for form dom element; request url
    const requestUrl = "http://www.reddit.com/search.json?q=kitten+nsfw:no"
    let staato = document.querySelector("form")
    let kitzone = document.querySelector("#selectzone")
    let stoppu = document.getElementById("pauseButton")
    let catArr = []
    // REQUEST DATA
    // take form element and prevent dfault behavior
    staato.addEventListener("submit", (e) => {
        e.preventDefault()
        let kitySelected = staato.value
        // make fetch request to const api url with given user number
        fetch(requestUrl + kitySelected)
            // .then --> take response data and format
            .then((res) => {
                return res.json()
            }) 
            // .then --> use response JSON data
            .then((jsonData) => {
                console.log(jsonData)
                catArr = jsonData.results
                kittyColle(catArr)
            })
            // .catch --> catch errors
            .catch((err) => {
                console.log(err)
                return err
            })
        
    })

    function kittyColle(kittenTime) {
        kittenTime.forEach((kitten) => {
            let kitject = document.createElement("img")
            kitject.textContent = `${kitten.image} hello is this thing on`
            kitzone.appendChild(img)
        })
    }
})

//     //RESPONSE DATA
//     // collect formatted data
//     function domPplzList(resArr) {
//         resArr.forEach((person) => {
//             // create an li element for each response
//             let li = document.createElement("li")
//             li.textContent = `${person.name.first} ${person.name.last}`

//             // add li element to DOM
//             peopleList.appendChild(li)
//         })
//     }
// })