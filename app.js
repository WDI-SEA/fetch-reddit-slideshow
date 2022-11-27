// console.log('script testing')

const options = {
    headers: {
        Accept: 'application/json'
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    //DOM selectors for start button and display for the images
    const btn = document.querySelector('#btn')
    const display = document.querySelector('#display')
    const input = document.querySelector('form')
    //this button will start slideshow when clicked
    btn.addEventListener('click', () => {
        const redditUrl = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        fetch(redditUrl, options)
        .then(responseData => responseData.json())
        .then(redditData => {
            //why is i shown as error in console 

            console.log(redditData.data.children[2].data.url)
            // redditData.data.children[i].data.url 

            //some function that filters out results and only returns .png and .jpeg

            //set that as the result to input.value
            //input.value = 
            const img = new Image()
            img.src=`https://www.reddit.com/search/${input.value}.png` 
            img.alt = redditData.reddit 
            display.append(img)
            // document.querySelector('#display').innerHTML = img
        })
        .catch(console.warn)
    })
    //this button's function will stop the slideshow when clicked
    const stop = document.querySelector('#stop')
    stop.addEventListener('click', ()=>{
        // display.innerHTML = " "
        //attempting while loop to clear 'display' div
        while (display.removeChild){
            display.removeChild(display.firstChild)
        }
    })
})


// -------------------discarded code 
 // while (display.firstChild) {
            //     display.appendChild(display.firstChild)
            // }
// const p = document.createElement('p')
            // p.innerText = redditData.data
            // display.appendChild(p)