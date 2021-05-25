
document.addEventListener('DOMContentLoaded', () => {

    newImage = document.getElementById('newImage')
    const requestUrl = 'http://www.reddit.com/search.json?q='
    let counter = 0
    let searchResults = []
    let interval
    let inputForm = document.querySelector('form')
    document.getElementById('button').addEventListener('click', startFetch)
    document.getElementById('restartButton').addEventListener('click', resetFetch)
    
    
    function startFetch() {
        document.querySelector('h1').style.display = 'none'

        inputForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let userInput = input.value
            console.log(userInput)
        
            fetch(requestUrl + userInput)
            .then((res) => {
                return res.json()
                console.log(requestUrl + userInput)
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
                if (counter === 10) {
                    counter = 0
                }
            }
            
            interval = setInterval(changeImage, 1000)
        })
    
    }

    function resetFetch() {
        clearInterval(interval)
        searchResults = []
        counter = 0
    }
})