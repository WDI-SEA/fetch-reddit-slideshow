document.addEventListener('DOMContentLoaded', () => {

    let form = document.querySelector('form')
    let searchInput = document.querySelector('#search-input')
    let imageContainer = document.querySelector('#image-container')
    let stopBtn = document.querySelector('#stopBtn')



    form.addEventListener('submit', e => {
        e.preventDefault()
    
        fetch(`http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`)
        .then(responseData => {
            return responseData.json()
        })
        .then(responseData => {
            console.log(responseData)
            let imageArray = []
            responseData.data.children.forEach(result => {
                let newImage = document.createElement('img')
                newImage.setAttribute('id', `${result.data.id}`)
                newImage.src = result.data.thumbnail
                newImage.alt = result.data.title
                if(result.data.post_hint === "image") {
                    imageContainer.append(newImage)
                    imageArray.push(newImage)
                }
            })
            console.log(imageArray)
            let i = 0
            imageArray[i].classList.add('active')
            let imageDisplayInterval = setInterval(() => {
                imageArray[i].classList.remove('active');
                
                i++;
                if (i === imageArray.length) i = 0;

                imageArray[i].classList.add('active');
            }, 5000);
            
            form.style.display = 'none'
            stopBtn.style.display = 'flex'

            stopBtn.addEventListener('click', e => {
                clearInterval(imageDisplayInterval)
                form.style.display = 'block'
                stopBtn.style.display = 'none'
                while(imageContainer.firstChild) {
                    imageContainer.removeChild(imageContainer.firstChild)
                }
            })

        })
        .catch(console.warn)
    })

    
})