document.addEventListener("DOMContentLoaded", ()=>{
    console.log("Working...")

    imageContainer = document.querySelector('#image-result-container')

    // SUBMIT EVENT
    const requestUrl = 'https://www.reddit.com/search.json?q=' // leave query open for search bar insertion

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // stop browser from refreshing
 

        fetch(requestUrl+input.value) // FETCH REQUESTS FROM THE URL
        .then ((responseData) => { // PROMISE THAT ASKS FOR JSON OBJECT
            // Fetch will package the response into an object with some methods that allow us to do some useful things with the response.
            // returning the JSON OBJECTS requested and converting it to JSON Format
            return responseData.json();
        }) 
        .then((jsonData) => {
            
            console.log(jsonData)
            // the above .then passed our returned data into this callback
            console.log(jsonData.data.children[0].data.url)
            


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

            // Display Logic
            imageList = document.querySelectorAll('img')
            let counter = 0
            let index = 0
            setInterval(() => {
                imageList[index].style.visibility = "visible";
                if (index > imageList.length) {
                    index = counter % imageList.length
                    console.log("greater than length" + index)}
                else if (index > 0) {
                    imageList[index].style.visibility = "visible";
                    imageList[index-1].style.visibility = "hidden";
                    console.log("less than legnth" + index)
                }                
                index++;
                counter++;
            } ,2000)

        })
        .catch((error) => {
            console.log("ERROR!", error)
        })

        listitems = document.querySelectorAll('li')
        listitems.forEach((items) => {
            items.remove()
        })
    
        // DISPLAY LOGIC
    
    
    
    })






})
