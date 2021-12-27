const url = 'https://www.reddit.com/search.json?q='
document.addEventListener('DOMContentLoaded', () => {


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const inputValue = userInput.value
    //    console.log(inputValue)
        fetch(url+inputValue)
        .then(resData => {
           return resData.json()
        })
        .then(jsonData => {
            console.log(jsonData)
        })
        .catch(error=> {
            console.log(error)
            
        })
    })
})