
document.addEventListener('DOMContentLoaded', () => {

    newImage = document.getElementById('newImage')
    const requestUrl = 'http://www.reddit.com/search.json?q='
    let counter = 0
    let searchResults = []
    let inputForm = document.querySelector('form')
    let userInput
    document.getElementById('button').addEventListener('click', startFetch)
    

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let userInput = input.value
        console.log(userInput)
    })

    function startFetch() {
        console.log('button')
        fetch(requestUrl + userInput)
        .then((res) => {
            return res.json()
        })
        .then((jsonData) => {
            searchResults = jsonData.data.children.filter(allLinks => String(allLinks.data.url).includes('i.redd')).map(filteredImages => filteredImages.data.url)
            changeImage()
            // console.log(searchResults)
        })
        .catch((err) => {
            return err
        })
        
        function changeImage() {
            newImage.src = searchResults[counter]
            counter++
        }

        setInterval(changeImage, 10000)
    }
})