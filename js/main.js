document.addEventListener('DOMContentLoaded', ()=> {
    let form = document.querySelector('form')
    const input = document.querySelector('#search')
    const imgbox = document.querySelector('#imgBox')
    const stop = document.querySelector('#stopBtn')

    form.addEventListener('submit', e => {
        e.preventDefault();


        fetch(`https://www.reddit.com/search.json?q=${input.value}+nsfw:no`)
            .then(redditData => {
                return redditData.json()
            })
            .then (redditData => {
                let imgArray = []
                redditData.data.children.forEach(result => {
                    let newImg = document/createElement('img')
                    newImg.setAttribute('id', `${result.data.id}`)
                    newImg.src = result.data.thumbnail
                    newImg.alt = result.data.title
                    if (result.data.post_hint === "image") {
                        imgbox.append(newImg)
                        imgArray.push(newImg)
                    }
                })
         
                // console.log(imgArray)

                let i = 0
                imgArray[i].classList.add('active')

                let imgDisplayInterval = setInterval(() => {
                    imgArray[i].classList.remove('active')
                    i++

                    if(i === imgArray.length) {
                        i = 0
                    }

                    imgArray[i].classList.add('active')
                }, (5000));

                form.style.display = 'none'
                stop.style.display = 'flex'
                stop.addEventListener('click', e => {
                    clearInterval(imgDisplayInterval)
                    form.style.display = 'block'
                    stop.style.display = 'none'
                    while(imgbox.firstChild) {
                        imgbox.removeChild(imgbox.firstChild)
                    }
                })
            })
    }) 
    .catch(console.warn)
})