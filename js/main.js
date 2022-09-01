
    let form = document.querySelector('form')
    let input = document.querySelector('#search')
    let slides = document.querySelector('.mySlides')
    
    const clear = document.querySelector('#clear')
    const disappear = document.querySelector('#disappear')
    const body = document.querySelector('body')
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        const userSearchUrl = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        disappear.style.display = 'none'
        
        fetch(userSearchUrl)
            .then(redditData => {
                return redditData.json()
            })
            .then (redditData => {

                let imgArray = [] 

                redditData.data.children.forEach(result => { 
                let newImage = document.createElement('img')
                newImage.setAttribute('id', `${result.data.id}`)
                newImage.src = result.data.thumbnail
                newImage.alt = result.data.title
                if (result.data.post_hint === "image") {
                    slides.append(newImage) 
                    imgArray.push(newImage)
                }
            })
                // console.log(imgArray)
            let i = 0
            imgArray[i].classList.add('active')

            let imageDisplayInterval = setInterval(() => {
                imgArray[i].classList.remove('active')

                i++

                if(i === imgArray.length) {
                    i = 0
                }

                imgArray[i].classList.add('active')
        
            }, (2000));
        
        clear.style.display = 'block'

        clear.addEventListener('click', e => {
            clearInterval(imageDisplayInterval)
            disappear.style.display = 'block'
            clear.style.display = 'none'
            input.value = ""
            while(slides.firstChild) {
                slides.removeChild(slides.firstChild)
            }
        })

    })
    .catch(console.warn)
})
