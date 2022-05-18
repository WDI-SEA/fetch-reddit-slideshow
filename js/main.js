const form = document.querySelector("#search")
const searchInput = form.querySelector("#search-input")
const slideshowContainer = document.querySelector("#slideshow-container")
const stopSlideshowBtn = document.querySelector("#stop-slideshow")

let slideshowInterval

const getImageUrls = (searchTerm) => {
  const encodedTerm = encodeURIComponent(searchTerm)
  const url = `http://www.reddit.com/search.json?q=${encodedTerm}+nsfw:no&limit=250`

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
  slideshowContainer.classList.remove("hidden")
  form.classList.add("hidden")
  let imageIndex = 0
  const currImageEle = document.querySelector("#currImg")
  let currImageUrl = imageUrls[imageIndex]
  currImage.src = currImageUrl
  imageIndex++

  slideshowInterval = setInterval(() => {
    currImageUrl = imageUrls[imageIndex]
    currImage.src = currImageUrl
    imageIndex >= imageUrls.length - 1 ? (imageIndex = 0) : imageIndex++
  }, 2000)
}

const stopSlideshow = () => {
  clearInterval(slideshowInterval)
  slideshowContainer.classList.add("hidden")
  form.classList.remove("hidden")
}

stopSlideshowBtn.addEventListener("click", stopSlideshow)
