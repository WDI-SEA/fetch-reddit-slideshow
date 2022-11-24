// const main = document.querySelector(".main")
// fetch("https://dummyjson.com/products")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data.products)
//     data.products.forEach((product) => {

//     })
//   })

// //<div class="card" style="width: 18rem;">
// //<img src="..." class="card-img-top" alt="...">
// //<div class="card-body">
// //<h5 class="card-title">Card title</h5>
// //<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
// //<a href="#" class="btn btn-primary">Go somewhere</a>
// //</div>
// //</div>
const main = document.querySelector(".main")
fetch("http://www.reddit.com/search.json?q=cat+nsfw:no")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data.children[0].data)
    //<div class="card" style="width: 18rem;">
    const card = document.createElement("div")
    card.classList.add("card", "mb-5")
    card.style.width = "18rem"
    //<img src="..." class="card-img-top" alt="...">
    const cardImgTop = document.createElement("img")
    cardImgTop.src = data.data.children[3].data.url
    cardImgTop.classList.add("card-img-top")
    cardImgTop.alt = "card alt tag"
    //<div class="card-body">
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    //<h5 class="card-title">Card title</h5>
    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.textContent = data.data.children[3].data.title
    //     cardTitle.textContent = product.title
    //<p class="card-text"></p>
    const cardText = document.createElement("p")
    cardText.classList.add("card-text")
    //     cardText.textContent = product.description
    //<a href="#" class="btn btn-primary">Go somewhere</a>
    //     const anchor = document.createElement("a")
    //     anchor.href = "#"
    //     anchor.classList.add("btn", "btn-primary")
    //     anchor.textContent = "Add to Cart"

    //</div>
    //</div>
    card.appendChild(cardImgTop)
    card.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    //     cardBody.appendChild(anchor)
    main.appendChild(card)
  })
