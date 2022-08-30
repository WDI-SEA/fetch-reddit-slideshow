const pageContainer = document.querySelector("#page-container");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const slideImg = document.querySelector("#slide-img");
const stopBtn = document.querySelector("#stop-btn");
let slideInterval = null;

const errorMessage = (err) =>
{
    searchForm.style.display = "none";
    console.warn(err);
    const p = document.createElement("p");
    p.innerText = "fetch error!";
    p.classList.add("error");
    pageContainer.append(p);
}

searchForm.addEventListener("submit", e =>
{
    e.preventDefault();
    searchForm.style.display = "none";    // Hides form
    // Display loading images message
    const pLoading = document.createElement("p");
    pLoading.innerText = "Loading images...";
    pageContainer.append(pLoading);
    const fetchUrl = `http://www.reddit.com/search.json?q=${searchInput.value}`;    // More fetch bugs when adding "+nsfw:no"
    fetch(fetchUrl).then(response =>
        {
            return response.json();
        }).then(searchResults =>
            {
                pLoading.remove();    // Remove loading images message
                stopBtn.style.display = "block";    // Shows stop button
                const imgArray = [];
                const altArray = [];
                searchResults.data.children.forEach(post =>
                {
                    // Don't store thumbnail value for certain post types
                    if (post.data.thumbnail !== "self" && post.data.thumbnail !== "spoiler" && post.data.thumbnail !== "default")
                    {
                        imgArray.push(post.data.thumbnail);
                        altArray.push(post.data.title);
                    }
                })
                if (imgArray.length > 0)    // If there's at least one image in fetch
                {
                    // Set first image of slideshow
                    slideImg.src = imgArray[0];
                    slideImg.alt = altArray[0];
                }
                if (imgArray.length > 1)    // Only goes through slideshow if there is more than one image
                {
                    let index = 1;    // Let slideInterval begin with the second image
                    slideInterval = setInterval(() =>
                    {
                        slideImg.src = imgArray[index];
                        slideImg.alt = altArray[index];
                        index++;
                        if(index >= imgArray.length)    // Stop slideshow at the last image
                        {
                            clearInterval(slideInterval);
                        }
                    }, 2000);
                }
                else if (imgArray.length <= 0)    // If no images fetched
                {
                    errorMessage();
                }
            }).catch(err =>
                {
                    errorMessage(err);
                })
})

// Reset to home page settings
stopBtn.addEventListener("click", () =>
{
    if (document.querySelector(".error"))
    {
        document.querySelector(".error").remove();
    }
    slideImg.src = "";
    slideImg.alt = "";
    stopBtn.style.display = "none";
    clearInterval(slideInterval);
    searchForm.style.display = "block";
})