document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.querySelector('#search-button')
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    const url = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    
    form.addEventListener('submit', e => {
        e.preventDefault()
        console.log(input.value)
        // step 1 -- fetch data
        fetch(url)
            //step 2 -- jsonify data
            .then(searchData => {
                return searchData.json()
            })
            // step 3 -- do something neat with json data
            .then(searchJson => {
                searchJson.results.forEach(result => {
                    console.log(result)
                })
            })
            // step 4 -- be a good programmer and handle errors
            .catch(console.warn)
    })    
   

})
