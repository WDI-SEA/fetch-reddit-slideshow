const url = 'https://www.reddit.com/search.json?q='
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
     
        console.log('hello', e);

        fetch(url+input.value)
        .then(resData => {
           resData.json()
        })
        .then(jsonData => {
            console.log(jsonData);
        })
    })
})