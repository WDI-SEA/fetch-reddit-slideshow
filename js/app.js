const searchButton = document.querySelector("#searchButton")
const header = document.querySelector(".header")
const description = document.querySelector(".description")
const form = document.querySelector(".search")
const textInput = document.querySelector("#searchInput")

searchButton.addEventListener("click", e => {
    e.preventDefault()
    header.innerText = " "
    description.innerText = " "
    form.style.display = "none"
    const cats = `https://www.reddit.com/search.json?q=${textInput.value}+nsfw:no`
    fetch(cats)
        .then(catsData => {
        return catsData.json()
        })
        .then(catsJson => {
            
            // const pTag = document.createElement("p")
            // pTag.innerText = catsJson
            let catObj = catsJson.data.children
            const display = document.querySelector("#return-area")
            
           
            const catImgs = catObj.map(catsMap => {
                return catsMap.data.thumbnail
            })
            console.log(catImgs)
            const filterSelf = catImgs.filter(value => {
                return value !== "self" 
            })

           
            console.log(filterSelf)
            let photoIndex = 0
            // imgTag.src = filterSelf[photoIndex]
            // imgTag.alt = "cat"
            
            

            const slideshow = setInterval(function () {
                if (photoIndex < filterSelf.length) {
                const imgTag = document.createElement("img")
                imgTag.src=filterSelf[photoIndex]
               
                display.append(imgTag)

                photoIndex++
                display.removeChild(display.firstChild)
                }
            }, 1000)
            const stop = document.querySelector("#stop")
            stop.style.display = "block"
            stop.addEventListener("click", () => {
                window.location.reload()
                const h1 = document.querySelector(".header")
                const p = document.querySelector(".description")
                clearInterval(slideshow)
                h1.innerText = "Search Reddit Images"
                p.innerText = "Type what you're searching for and click the search button.."
                form.style.display = "flex"
                display.style.display = "none"
                display.removeChild(display.firstChild)


            })
        })
        .catch(error => {
            console.warn(error)
        })
    })
                
     
            
    
        

