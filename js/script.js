document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.querySelector('#search-button')
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    const url = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    
    form.addEventListener('submit', e => {
        e.preventDefault()
        console.log(input.value)
        fetch(url)
            .then(searchData => {
                return searchData.json()
            })
            // .then(console.log)
            .then(searchJson => {
                
            })
    })    
   

})
