document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('input')
    const submitBtn = document.querySelector('#submitBtn')
    const form = document.querySelector('form')
    const bigDiv = document.querySelector('#bigDiv')
    const results = document.querySelector('#results')
    const body = document.querySelector('body')
    
    console.log(input)
    console.log(submitBtn)

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const url = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        bigDiv.style.visibility = "hidden"

        fetch(url)
            .then(search => {
                return search.json()
            })
            .then(searchTerm => {
                console.log(searchTerm.data.children)
                const imageSearch = searchTerm.data.children

                imageSearch.forEach(result => {
                    const img = document.createElement('img')
                    img.src = result.data.thumbnail
                    results.appendChild(img)
                })

                const clearBtn = document.createElement('button')
                clearBtn.innerText = "Reset"
                body.appendChild(clearBtn)
                clearBtn.addEventListener('click', () => {
                    bigDiv.style.visibility = 'visible'
                    clearBtn.style.visibility = 'hidden'
                    input.value = ""
                    while (results.hasChildNodes){
                        results.removeChild(results.firstChild)
                    }
                })
            })
            // .catch(err => {
            //     console.warn(err)
            // })
    }) 
})