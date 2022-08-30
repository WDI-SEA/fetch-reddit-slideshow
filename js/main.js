document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button')
    const body = document.querySelector('body')
    const input = document.querySelector('#search-input')
    const form = document.querySelector('form')
    const section = document.querySelector('section')
    const slideDiv = document.querySelector('#slideshow-container')
    
    form.addEventListener('submit', e =>{
        e.preventDefault()
        //hide 
        section.style.display = "none"
        const redditURL = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        
        fetch(redditURL)
            .then(response => {
                return response.json()
            })

            .then(jsonData =>{
                // console.log(jsonData.data.children)
                // const dataArr = jsonData.data.children
                // function containsImg(data){
                //     if(data.thumbnail == true){
                //         return true
                //     }
                //     else{return false} 
                // }
                // const imgArr = dataArr.filter(containsImg())
                // console.log(imgArr)
                jsonData.data.children.forEach(result => {
                    const img = document.createElement('img')
                    slideDiv.appendChild(img)
                    setInterval(() => {
                        img.src = result.data.thumbnail
                    }, 2000); 

                    
                });
                const clearButton = document.createElement('button')
                clearButton.style.display = "inline"
                clearButton.innerText = "clear"
                body.append(clearButton)
                clearButton.addEventListener('click', (e) => {
                    while(slideDiv.firstChild){
                        slideDiv.innerHTML = ''
                        break
                    }
                    section.style.display = "flex"
                    clearButton.style.display = "none"
                    input.value = ''
                })
            })
            .catch(err =>{
                console.warn(err)
            })
    })




})