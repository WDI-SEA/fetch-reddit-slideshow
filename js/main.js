document.addEventListener('DOMContentLoaded', () => {
    console.log('console running')
    
    let imgUrl
    
    function deleteChildren() {
        while (imageBank.firstChild) {
            imageBank.removeChild(imageBank.firstChild)
        }
    }
    
    let requestURL = 'https://www.reddit.com/search.json?q=kittens'

    document.addEventListener('submit', (e) => {
        e.preventDefault()
        requestURL = 'https://www.reddit.com/search.json?q=kittens'
        
         // Promise statement - resolve this fetch statement
        fetch(requestURL)

        // THEN run this, once the fetch has been resolved
        .then((responseData) => {
            return responseData.json()
        })

        // This catches the data returned from the previous .then, populating the jsonData variable
        .then((jsonData) => {
            console.log(jsonData.data.children[0].data.thumbnail)
            display.src = jsonData.data.children[0].data.thumbnail
        })

        // Throw an error if the promise is not fulfilled
        .catch((error) => {
            console.log('error!')
            console.log(error)
        })
    })
})