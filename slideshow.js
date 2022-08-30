document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.querySelector('form')
    const input = document.querySelector('#search')
    const disappear = document.querySelector('#disappear')
    const body = document.querySelector('body')
    const imgbox = document.querySelector('#imgbox')
    const clear = document.querySelector('#clear')
    let i = 0
    form.addEventListener('submit', e => {
        e.preventDefault();
        imgbox.setAttribute("style", "display:block;")
        const userSearchUrl = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        disappear.setAttribute("style", "display:none")
       
        fetch(userSearchUrl)
            .then(redditData => {
                return redditData.json()
            })
            .then (jsonData => {
                const imgParentArray = jsonData.data.children
                console.log(imgParentArray)
                let imgUrls = imgParentArray.map(x => x.data.thumbnail)
                console.log(imgUrls)
                let filteredUrls = imgUrls.filter(value => {
                    return (value !== 'self' && value !== 'default')
                })
                console.log(filteredUrls)
                const createImg = setInterval(function() {
                    const img = document.createElement('img')
                    img.className = 'imgsize'
                    img.src = filteredUrls[0+i]
                    imgbox.appendChild(img)
                    imgbox.removeChild(imgbox.firstChild)
                    i++
                    if (i >= filteredUrls.length) {
                        i = 0
                    }
                }, 500)
                clear.setAttribute("style", "display:block;")
                clear.addEventListener('click', ()=> {
                    clearInterval(createImg)
                    disappear.setAttribute("style", "display:block;")
                    clear.setAttribute("style", "display:none;")
                    imgbox.setAttribute("style", "display:none;")
            }) 
        })
    })
})