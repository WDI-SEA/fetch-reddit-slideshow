document.addEventListener("DOMContentLoaded", () => {
    // store constant url for form dom element; request url
    const requestUrl = "    http://www.reddit.com/search.json?q="
    let inputForm = document.querySelector("form")
    let imageDisplay = document.querySelector("#displayImages")
    let imageResults = []

    // variables to check if src data is an image
    const imageTypes = [".jpg", ".jpeg", ".png"]


    // REQUEST DATA
    // take form element and prevent default behaviour
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault()

        // get user inputed value
        let userInput = input.value
        console.log(`User Input: ${userInput}`)

        // make fetch request to const api url with given user number
        fetch(requestUrl + userInput + "&limit=100")
            // .then --> take response data and format
            .then(res => {
                console.log("Response came back!")
                return res.json()
            })
            // .then --> use response JSON data
            .then(jsonData => {
                imageResults = jsonData.data.children
                                .filter(element => String(element.data.url_overridden_by_dest).includes(".jpg"))
                                .map(filteredData => filteredData.data.url_overridden_by_dest)

                console.log(imageResults)
                displayImage(imageResults)
            })
            // .catch --> catch errors
            .catch(err => {
                console.log(err)
                return err
            })
    })

    function displayImage(results) {
        imageDisplay.src = results[0]
    }
    // RESPONSE DATA
    // collect formated data
    // function domPeopleList(resArr) {
    //     resArr.forEach(person => {
    //         // create an li element for each response
    //         let li = document.createElement("li")
    //         li.textContent = person.name.first + " " + person.name.last
            
    //         // add li element to DOM
    //         peopleList.appendChild(li)
    //     })
    // }
})