document.addEventListener('DOMContentLoaded', () => {
const button = document.querySelector('button')
const body = document.querySelector('body')
const input = document.querySelector('#search-input')
const form = document.querySelector('form')
const section = document.querySelector('section')
const div = document.querySelector('div')
form.addEventListener('submit', e =>{
    section.style.display = "none"
    e.preventDefault()
    const redditURL = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(redditURL)
        .then(response => {
            return response.json()
            
        })
        .then(jsonData =>{
            console.log(jsonData.data.children)
            jsonData.data.children.forEach(result => {
                const img = document.createElement('img')
                img.src = result.data.thumbnail
                div.appendChild(img)
            });
            const clearButton = document.createElement('button')
            clearButton.innerText = "clear"
            body.append(clearButton)
            clearButton.addEventListener('click', (e) => {
                while(div.firstChild){
                    div.remove()
                    break
                }
                section.style.display = flex
            })
        })
})



})