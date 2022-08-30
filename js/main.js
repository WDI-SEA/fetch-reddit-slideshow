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
            .then((response) => response.json())

            .then(jsonData =>{
                // console.log(jsonData.data.children)
                let imgArr = []
                jsonData.data.children.forEach(result => {
                    let newImg = document.createElement('img')
                    newImg.setAttribute('id', `${result.data.id}`)
                    newImg.src = result.data.thumbnail
                    if(result.data.post_hint === "image"){
                        slideDiv.append(newImg)
                        imgArr.push(newImg)
                    }
                    
                });
                // console.log(imgArr)
                let i = 0
                imgArr[i].classList.add('active')

                let imgDisplayInterval = setInterval(() => {
                    imgArr[i].classList.remove('active')
                    i++
                    if(i === imgArr.length){
                        i = 0
                    }
                    imgArr[i].classList.add('active')
                }, 2000)

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
                    clearInterval(imgDisplayInterval)
                })
            })
            .catch(err =>{
                console.warn(err)
            })
    })




})