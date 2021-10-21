// TODO: Make the form / title / description hide
// TODO: * Add some interesting style / animation x
// TODO: * Create button to stop animation (tip: use [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)). x
// TODO: TRY NEW IMPLEMENTATION OF SLIDE TRANSITION x MAYBE LATER
// TODO: REFACTOR IF TIME ALLOWS



document.addEventListener("DOMContentLoaded", ()=>{
    console.log("Working...")
    stopButton = document.querySelector("#stop-button")
    imageContainer = document.querySelector('#image-result-container')
    formContainer = document.querySelector('form')
    // SUBMIT EVENT
    const requestUrl = 'https://www.reddit.com/search.json?q=' // leave query open for search bar insertion

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // stop browser from refreshing
 

        fetch(requestUrl+input.value) 
        .then ((responseData) => { 
            return responseData.json();
        }) 
        .then((jsonData) => {
            formContainer.style.visibility = "hidden"

            // STORING OUTPUT
            let imageArray = []
            jsonData.data.children.forEach((result) => {
                imageArray.push(result.data.url)
            })
            console.log(imageArray)

            // FILTERING OUTPUT
            jpg = ".jpg"
            png = ".png"
            const filterResults = ((results) => {
                if (results.includes(jpg) || results.includes(png)) {
                    return results
                } else {
                    return ""
                }
            }) 
            const onlyImageArray = imageArray.filter(filterResults)
            console.log(onlyImageArray)
            
            let image = document.createElement('img')
            // ADDING OUTPUT TO PAGE
            onlyImageArray.forEach((result, index)=>{
                let image = document.createElement('img')
                image.classList.add("list-group-item")
                image.src = result
                image.dataset.value = index
                console.log(image.dataset.value)
                console.log("Image Source" + image.src)
                imageContainer.appendChild(image)
                image.style.visibility = "hidden"
            })

            // DISPLAY AS SHITTY SLIDESHOW
            imageList = document.querySelectorAll('img')
            let counter = 0
            let index = 0
            if (index >= imageList.length){
                index = 0
            }
            let imageDisplay = setInterval(() => { // MUST BE AN INDEXING OUT OF RANGE ISSUE.

                imageList[0].style.visibility = "visible";
                if (index == 0) {
                    imageList[index].style.visibility = "visible";
                    console.log("index is now " + index)
                } else if (index < imageList.length - 1) { // dont forget 0 indexing
                    imageList[index].style.visibility = "visible" // current
                    imageList[index-1].style.visibility = "hidden" // previous
                    console.log("index is now greater than 0: " + index)
                } else {
                    imageList[index].style.visibility = "hidden" // current
                    imageList[index-1].style.visibility = "hidden"  
                    index = -1
                }
                index++;
            } ,2000)
            
            const stopShow = () => {
                clearInterval(imageDisplay)
                formContainer.style.visibility = "visible"
                console.log("is the form returning?")
                listitems = document.querySelectorAll('img')
                listitems.forEach((items) => {
                    items.remove()
                })
            }
    
            stopButton.addEventListener('click', stopShow)



        })
        .catch((error) => {
            console.log("ERROR!", error)
        })


        // DISPLAY LOGIC
    
    
    
    })






})
