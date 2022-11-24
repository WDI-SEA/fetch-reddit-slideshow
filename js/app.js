// DOM SELECTORS
const form = document.querySelector(".input-form")
const main = document.querySelector(".main")
const textBtn = document.getElementById("input-btn")
const textInput = document.getElementById("text-input")
const imgContainer = document.querySelector(".image-container")
let query = ""
// reset button
const resetButton = document.createElement("button")
resetButton.classList.add("btn", "btn-danger", "w-100")
resetButton.textContent = "Reset"
// RESET CLICK LISTENER
resetButton.addEventListener("click", (e) => {
  e.preventDefault()
  location.reload()
})
// INPUT SUBMIT CLICK EVENT
textBtn.addEventListener("click", (e) => {
  e.preventDefault()
  query = textInput.value
  fetch(`http://www.reddit.com/search.json?q=${query}+nsfw:no`, {
    Accept: "application/json",
  })
    .then((res) => res.json())
    .then((data) => {
      while (main.firstChild) {
        main.removeChild(main.firstChild)
      }
      main.appendChild(resetButton)

      const posts = data.data.children

      posts.forEach((post) => {
        const card = document.createElement("div")
        card.classList.add("card", "mt-5", "text-center")
        card.style.width = "18rem"

        const cardImgTop = document.createElement("img")
        cardImgTop.src = post.data.url
        cardImgTop.classList.add("card-img-top")
        cardImgTop.alt = "card alt tag"

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const cardTitle = document.createElement("h5")
        cardTitle.classList.add("card-title")
        cardTitle.textContent = post.data.title

        const cardText = document.createElement("p")
        cardText.classList.add("card-text")
        cardText.textContent = `Author: ${post.data.author}`

        const anchor = document.createElement("a")
        anchor.href = `https://www.reddit.com/${post.data.permalink}`
        anchor.target = "_blank"
        anchor.classList.add("btn", "btn-success")
        anchor.textContent = "See on Reddit.com"
        anchor.id = "anchor"

        card.appendChild(cardImgTop)
        card.appendChild(cardBody)
        cardBody.appendChild(cardTitle)
        cardBody.appendChild(cardText)
        cardBody.appendChild(anchor)
        main.appendChild(card)
      })
    })
})
