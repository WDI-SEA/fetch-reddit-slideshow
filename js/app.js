const requestURL = "http://www.reddit.com/search.json?q="
const slideShow = document.getElementById("slideshow")
// const words = document.getElementsByClassName("words")
const button = document.getElementById("submit")

document.addEventListener("DOMContentLoaded",() => {

    form.addEventListener("submit", (e) => {
        e.preventDefault() // stops browser from refreshing
        // fetch the data
        fetch(requestURL+search.value)
    .then((responseData) => {
        //extract JSON data from fetch object
        return responseData.json()
    })
    .then((jsonData) => {
        // the above .then passed our returned json data into this cb
        slideShow.innerHTML = `<img src="$data.file}" +>`
    })
        console.log("JSON DATA:")
        // console.log(jsonData.data)
        // jsonData.data.forEach()
    })
    })

    var words = document.getElementById("words");
    words.addEventListener("keydown", function (e) {
        if (e.key === 13) {
            validate(e);
        }
    })

    function validate(e) {
        if (document.getElementById('words').style.display == 'block') {
            document.getElementById('words').style.display = 'none'
            document.getElementById('words').style.display = 'block'
        }
    }





//     form.addEventListener("submit", (e) => {
//         e.preventDefault() // stops browser from refreshing
//         // fetch the data
//         fetch(requestURL+search.value)
//     .then((responseData) => {
//         //extract JSON data from fetch object
//         return responseData.json()
//     })
//     .then((jsonData) => {
//         // the above .then passed our returned json data into this cb
//         console.log("JSON DATA:")
//         console.log(jsonData.data)
//         // jsonData.data.forEach()
//     })
//     .catch((error) => {
//         // If any error is sent back, you will have access to it here
//         console.log("error", error)
//     })
//     })
// })

//     // addPerson receives a RU object and adds their name to the ul
//     const displayImages = (picture) => {
//         // create new li element
//         const div = document.createElement("div")
//         // add person's name as text to the li
//         div.textContent = `${person.name.first} ${person.name.last}`
//         // add the li to the ul
//         // const ul = document.querySelector("ul")
//         peopleList.appendChild(li)
//     }

//     JSON.data.children[variable goes here].data.thumbnail


    // form.addEventListener("submit", (e) => {
    //     e.preventDefault() // stops browser from refreshing
    //     // fetch the data
    //     fetch(requestURL+search.value)
    // .then((responseData) => {
    //     //extract JSON data from fetch object
    //     return responseData.json()
    // })
    // .then((jsonData) => {
    //     // the above .then passed our returned json data into this cb
    //     slideShow.innerHTML = `<img src="$data.file}"/>`
    //     console.log("JSON DATA:")
    //     console.log(jsonData.data)
    //     // jsonData.data.forEach()
    // })
    // }
// const slideShow = document.getElementById("slideshow")
// const search = document.getElementById("search")
// const submit = document.getElementById("submit")

// submit.addEventListener("click", getResults)

// function getResults() {
//     fetch("http://www.reddit.com/search.json?q=")
//     .then(res => res.json())
//     .then(data => {
//         slideShow.innerHTML = `<img src="$data.file}"/>`
//     })
