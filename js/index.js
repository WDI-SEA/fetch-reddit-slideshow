document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('form')
    let searchInput = document.querySelector('#search-input')
    let imageContainer = document.querySelector('#image-container')
    let stopBtn = document.querySelector('stop-btn')

    form.addEventListener('submit', (e) => {
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

            let = 0
            imageArray[i].classlist.add('active')

            let imageDisplayInterval = setInterval(() => {
                imageArray[i].classlist.remove('active')

                i++

                if(i === imageArray.length) {
                    i = 0
                }

                imageArray[i].classlist.add('active')
            }, (5000))
            form.style.display = 'none'
            stopBtn.style.display = 'flex'
            stopBtn.addEventListener('click', () => {
                clearInterval(imageDisplayInterval)
                form.display = 'block'
                stopBtn.style.display = 'none'
                while(imageContainer.firstChild) {
                    imageContainer.removeChild(imageContainer.firstChild)
                }
            })
        })
        .catch(console.warn)
    })
})
















// const form = document.querySelector('form')

// const displayResults = document.querySelector('.slideshow-container')

// const hiddenDiv = document.querySelector("#hide")

// // const button = document.querySelector("#button")

// form.addEventListener('submit', e => {
//     e.preventDefault()
       
//     const searchInput = document.querySelector('#search-input')
//     const url = `http://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`
    
    
//     fetch(url)
//         .then(response => response.json())

//         .then(data => {
//             console.log(data.data.children)
//         const imageParent = data.data.children

//         // console.log(imageParent[0].data.preview.images[0].resolutions)

//         // const images = imageParent[0].data.preview.images[0].resolutions

//         // console.log(imageParent)

//         imageParent.forEach(result => {
//             const img = document.createElement('img')
//             img.src = result.data.thumbnail
//             displayResults.appendChild(img)
//         })


        // const resetButton = document.createElement('button')
        // resetButton.innerText = 'reset'
        // body.appendChild(resetButton)
        // resetButton.addEventListener('click', () => {
        //     hiddenDiv.getElementsByClassName.visibility = 'visible'
        //     resetButton.style.visibility = 'hidden'
        //     input.value = ""
        //     while (displayResults.hasChildNodes) {
        //         displayResults.removeChild(displayResults.firstChild)
        //     }
        // })


        // form.remove(form)
        // form.createElement('button')
//         })
//         .catch(err => {
//             console.warn(err)
//         })

// })

