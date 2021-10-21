document.addEventListener("DOMContentLoaded"), () => {

    const requestURL = 'https://www.reddit.com/search.json?q=+nsfw:no'

    form.addEventListener('submit', (e)=>{
        e.preventDefault() // This will stop the browser from refreshing
        console.log('script is running')
        // fetch data
        fetch(requestURL)
        .then((responseData)=> {
            return responseData.json()
        })
        .then((jsonData)=> {
            console.log(jsonData)
        })
        .catch((error)=>{
            console.log('Oh no, there has been an error', error)
        })
    })
}