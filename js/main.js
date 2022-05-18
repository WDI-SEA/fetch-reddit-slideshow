const form = document.querySelector("#search")
const searchInput = form.querySelector("#search-input")

let slideshowInterval

const getImageUrls = (searchTerm) => {
  const encodedTerm = encodeURIComponent(searchTerm)
  const url = `http://www.reddit.com/search.json?q=${encodedTerm}+nsfw:no`

  return fetch(url)
    .then((response) => response.json())
    .then((json) =>
      json.data.children
        .map((fullPost) => fullPost.data)
        .filter((postData) => postData.post_hint === "image")
    )
    .then((imagePosts) => imagePosts.map((post) => post.url))
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const query = searchInput.value

  if (slideshowInterval) clearInterval(slideshowInterval)

  const imageUrlsPromise = getImageUrls(query)

  imageUrlsPromise.then(startSlideshow)
})

const startSlideshow = (imageUrls) => {
  let imageIndex = 0
  const currImageEle = document.querySelector("#currImg")
  let currImageUrl = imageUrls[imageIndex]
  currImage.src = currImageUrl
  imageIndex++

  console.log(imageUrls)
  slideshowInterval = setInterval(() => {
    console.log(imageIndex, currImageUrl)
    currImageUrl = imageUrls[imageIndex]
    currImage.src = currImageUrl
    imageIndex >= imageUrls.length - 1 ? (imageIndex = 0) : imageIndex++
  }, 3000)
}

const stopSlideshow = () => {
  clearInterval(slideshowInterval)
}
