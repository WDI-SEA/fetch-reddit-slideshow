console.log('i am working')

// document.addEventListener('DOMContentLoaded', () => {

    const button = document.querySelector('#button')

    button.addEventListener("click", () => {
        const imgInput = document.querySelector('#search').value
        const url = `http://www.reddit.com/search.json?q=${imgInput}+nsfw:no` 

        fetch(url)
        .then(inputData => {
            return inputData.json()
        }) 
        .then(jsonData => { 
            const datas= jsonData.data.children
            datas.forEach(data => {
                const div = document.querySelector('div')
                console.log(data.data)
                const img = document.createElement('img')
                img.src = data.data.thumbnail
                div.append(img)
            })

        })
    })

// } )