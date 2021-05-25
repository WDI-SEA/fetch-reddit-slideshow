const requestUrl = "https://www.reddit.com/search.json?q="
let inputForm = document.querySelector("form")
let buttonBox = document.getElementById("buttonbox")
let searchButton = document.getElementById("searchbutton")
let searchRes = []
let jpgString = ".jpg"
let pngString = ".png"
let imgRes = []


inputForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let userInput = input.value
    async function searchReddit() {
        try {
            let res = await fetch(requestUrl + userInput)
            let jsonData = await res.json()
            jsonData.data.children.forEach((elem) => {
            searchRes.push(elem.data.url_overridden_by_dest)
            imgRes = searchRes.filter(elem => elem.includes('.jpg') || elem.includes('.png'))
            replaceImage()
            })
        } catch(err) {
            console.log(err)
            return err
        }
    }
    searchReddit()
})

function replaceImage() {
    let resImg = document.getElementById("resImg")
    resImg.src = imgRes[0]
    console.log(imgRes)
    inputForm.remove()
    var stopCycle = document.createElement("button")
    stopCycle.innerHTML = "STOP"
    buttonBox.appendChild(stopCycle)
}

// function incrementImage() {
//     imgRes++
// }

// let runInterval = setInterval(incrementImage(), 4000)

// function domResList(resArr) {
//     resArr.forEach((entry) => {
//         let resImg = document.getElementById("resImg")
//         resImg.src = "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"



//         // li.textContent = `${person.name.first} ${person.name.last}`
//         // peopleList.appendChild(img)
//     })
// }

// DEFECTIVES

// imgRes = searchRes.filter(elem => elem.includes('.jpg') || elem.includes('.png'))

// --> Returns a gradual push array, not ideal.
// for (i = 0; i < searchRes.length; i++) {
//     if(searchRes[i].match(jpgString) || searchRes[i].match(pngString)) {
//         imgRes.push(searchRes[i])
//     }
// }