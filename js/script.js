document.addEventListener("DOMContentLoaded", () => {
    // store constant url for form dom element; request url
    const requestUrl = "http://www.reddit.com/search.json?q=kitten+nsfw:no"
    let staato = document.getElementById("startButton")
    let stoppu = document.getElementById("pauseButton")
    let catArr = []
    // REQUEST DATA
    // take form element and prevent dfault behavior
    addEventListener("submit", (e) => {

        e.preventDefault()
        // make fetch request to const api url with given user number
        console.log('yes hello')
            // .then --> take response data and format
            // .then((res) => {
            //     return res.json()
            // }) 
            // // .then --> use response JSON data
            // .then((jsonData) => {
            //     console.log(jsonData)
            //     catArr = jsonData.results
            // })
            // // .catch --> catch errors
            // .catch((err) => {
            //     console.log(err)
            //     return err
            // })
        
    })
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