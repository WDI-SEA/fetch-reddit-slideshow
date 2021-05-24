document.addEventListener("DOMContentLoaded", () => {
    // set variables
    const requestUrl = '"https://www.reddit.com/search.json?q=kittens"'
    let inputForm = document.querySelector('form')
    let catPics = document.querySelector('#catPics')
    let catRes = []

    //REQUEST DATA 
    //take form element and prevent default behavior
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()
     // get user inputted animal
        let userInput = input.value

    //make fetch request to const api url with given user input   
    fetch("https://www.reddit.com/search.json?q=kittens")
    .then((res) => {
        console.log("it works!")
        return res.json()
    })
        .then ((jsonData) => {
            catRes = jsonData.results
            domCatPics(catRes)
        })
    })
        .catch((err) => {
        console.log(err)
        return err
    })


    function domCatPics (resArr) {
        resArr.forEach((cat) => {
            // create an li element for each response 
            let li = document.createElement("li")
            li.textContent = person.name.first +  " " + person.name.last
            
            // add li element to DOM
            peopleList.appendChild(li)
        })
    }



 })

   

        //.then --> thake response data and format

        // .then --> use response JSON data

        // .catch --> catch errors



    // RESPONSE DATA
    // collect formatted data

        //creat an li element for each response/ make collage

        //add li element to DOM





