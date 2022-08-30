document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.querySelector('#search-button')
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    const hideDiv = document.querySelector('#hide')
    const body = document.queryCommandIndeterm('body')
    const results = document.querySelector('#results')

    form.addEventListener('submit', e => {
        e.preventDefault()
        const url = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        console.log(input.value)
        // step 1 -- fetch data
        fetch(url)
            //step 2 -- jsonify data
            .then(searchData => {
                return searchData.json()
            })
            // step 3 -- do something neat with json data
            .then(searchJson => {
                console.log(searchJson.data.children)
                const imgParent = searchJson.data.children
                // console.log(imgParent[0].data.thumbnail)
                imgParent.forEach(result => {
                    const img = document.createElement('img')
                    img.src = result.data.thumbnail
                    results.appendChild(img)
                })
               
                })
    })
})
            // step 4 -- be a good programmer and handle errors
            // .catch(console.warn)
      
   


