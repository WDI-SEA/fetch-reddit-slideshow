document.addEventListener("DOMContentLoaded", () => {
    
    // set variables
    const requestUrl = 'http://www.reddit.com/search.json?q='
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
    fetch(requestUrl + userInput)
        .then((response) => {
            let jsonData = response.json()
            console.log("it works!")
            return jsonData
    })
        .then ((jsonData) => {
            catRes = jsonData.data.children
            // domCatRes(catRes)
            console.log(catRes)
            for (let i =0; i <catRes.length; i++) {
                (catRes.results[i].data.url)                
            }
        })
        .catch((error) => {
            console.log(error)
        })
    })


    // // function domCatPics (resArr) {
    // function domCatRes (catRes) {
    //     catRes.forEach((cat) => {
    //         console.log(cat.data.url)
    //         let li = document.createElement('img')
    //         let img = catRes
    //         li.textContent = catRes.url

    //         li.appendChild(img)
            
    //     })
    // }



 })

   

        //.then --> thake response data and format

        // .then --> use response JSON data

        // .catch --> catch errors



    // RESPONSE DATA
    // collect formatted data

        //creat an li element for each response/ make collage

        //add li element to DOM





