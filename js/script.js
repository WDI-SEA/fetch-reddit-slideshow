console.log('i am working')

document.addEventListener('DOMContentLoaded', () => {
    let imageContainer = document.querySelector('#image-container')
    const button = document.querySelector('#button')
    let stopBtn = document.querySelector('#stop-btn')

    button.addEventListener("click", (e) => {
        e.preventDefault()
        const imgInput = document.querySelector('#search').value
        const url = `http://www.reddit.com/search.json?q=${imgInput}+nsfw:no` 
        let imageContainer = document.querySelector('#image-container')

        fetch(url)
        .then(inputData => {
            return inputData.json()
        }) 
        .then(jsonData => { 
            const datas= jsonData.data.children
            datas.forEach(data => {
                const div = document.querySelector('div')
                // console.log(data.data)
                const img = document.createElement('img')
                img.src = data.data.thumbnail
                div.append(img)
            })
            // let i = 0
            // jsonArray[i].classList.remove('active')

            // let imageDisplayInterval = setInterval(() => {
            //     jsonArray[i].classList.remove('active')

            //     i++

            //     if( i === jsonArray.length) {
            //         i = 0
            //     }

            //     jsonArray[i].classList.add('active')
            // }, (5000))

        })
    })

} )