console.log("😎 Cool loading");


const redditPicEndPoint = 'https://www.reddit.com/search.json?q=kittens'

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        // stops all default functionality like page reloading when we submit a form
        // while(peopleList.firstChild) {
        //     peopleList.removeChild(peopleList.firstChild)
        // }
        


        fetch(redditPicEndPoint + input.value)
        .then((fetchedPics)=>{
            return fetchedPics.json()
        })
        .then((jsonPics)=>{
            jsonPics.results.forEach(addPerson)
            
        })
        .catch((err)=>{
            console.log('Failed to fetch Users!!', err)
        })
        
    })
})