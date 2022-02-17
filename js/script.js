let i = 0
let slides = ""

const fetchPics = () => {
    const endpoint = `https://www.reddit.com/search.json?q=${searchInput.value}+nsfw:no`

    fetch(endpoint)
    .then((fetchObj) => {
        return fetchObj.json()
    })
    .then((jsonData) => {
        picUrl(jsonData.data.children)
    })
    .catch(err => console.log('Error fetching data: ', err))
}

const picUrl = (dataChildren) => {
    let picArr = dataChildren.map(element => {
        return element.data.thumbnail
    })
    const myInterval = setInterval(() => {

        mainPic.src = picArr[i]
        i++
    }, 1000)
    stopShow.addEventListener('click', () => {
        clearInterval(myInterval)
        instructions.style.display = 'block'
        stage.style.display = 'none'
    })
}


search.addEventListener('click', e => {
    e.preventDefault()
    instructions.style.display = 'none'
    document.getElementById('stage').style.display = 'block'
    fetchPics()
})
