console.log('script testing')

const redditUrl = 'https://www.reddit.com/r/sneakers/new.json?nsfw:no'
const options = {
    headers: {
        Accept: 'application/json'
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    const btn = document.querySelector('#btn')
    const display = document.querySelector('#display')
    //this button will start slideshow when clicked
    btn.addEventListener('click', () => {
        fetch(redditUrl, options)
        .then(responseData => responseData.json())
        .then(redditData => {
            console.log(redditData)
            while (display.firstChild) {
                display.appendChild(display.firstChild)
            }
            const p = document.createElement('p')
            p.innerText = redditData.reddit 
            display.appendChild(p)
            const img = new Image()
            img.src='https://www.reddit.com/r/sneakers/${redditData.id}.png'
            img.alt = redditData.reddit 
            display.append(img)
            document.querySelector('#display').innerHTML = img
        })
        .catch(console.warn)
    })
    //this button's function will stop the slideshow when clicked
    const stop = document.querySelector('#stop')
    stop.addEventListener('click', ()=>{
        pause();
    })
})