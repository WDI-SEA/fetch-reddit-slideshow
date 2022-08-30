document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('form')
    const searchBar = document.getElementById('search-bar')
    const img = document.querySelector('img')
    const stop = document.querySelector('#stop')
    const h1 = document.querySelector('h1')
    const submit = document.querySelector('#submitBtn')

    let imgArr = []
    let arrIndex = 0

    form.addEventListener('submit', e=>{
        e.preventDefault()
        h1.classList.add('hidden')
        submit.classList.add('hidden')
        searchBar.classList.add('hidden')
        stop.classList.remove('hidden')
        img.classList.remove('hidden')


        const redditUrl = `https://www.reddit.com/search.json?q=${searchBar.value}+nsfw:no`
        // console.log(redditUrl)

        fetch(redditUrl)
            .then(redditData =>{
                // console.log(redditData.json())
                return redditData.json()
            })
            .then(redditJson=>{
                redditJson.data.children.forEach(result=>{
                    if(result.data.thumbnail != "self"){
                    imgArr.push(result.data.thumbnail)


                    }
                })
                const arrInt = setInterval(()=>{
                    arrIndex += 1
                    if(arrIndex <= imgArr.length -1){
                     img.src = `${imgArr[arrIndex]}`
                    } else {arrIndex = 0}
                }, 2000)
                 
                
            })
    })
    stop.addEventListener('click', ()=>{
        console.log('hi')
        h1.classList.remove('hidden')
        submit.classList.remove('hidden')
        searchBar.classList.remove('hidden')
        stop.classList.add('hidden')
        img.classList.add('hidden')
        img.src = "./loading.jpg"
        arrIndex = 0
        imgArr = []
        searchBar.value = ""
        clearInterval(arrInt)
    })
    
})