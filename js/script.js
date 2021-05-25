
document.addEventListener('DOMContentLoaded', () => {

    newImage = document.getElementById('newImage')
    // newImage.src = 'https://i.redd.it/l1sjqoy3kqz61.png'
    const requestUrl = 'http://www.reddit.com/search.json?q=cats'
    let searchResults = []

    fetch(requestUrl)
    .then((res) => {
        return res.json()
    })
    .then((jsonData) => {
        searchResults = jsonData.data.children.filter(allLinks => String(allLinks.data.url).includes('i.redd')).map(filteredImages => filteredImages.data.url)
        console.log(searchResults)
    })
    .catch((err) => {
        return err
    })
    

})