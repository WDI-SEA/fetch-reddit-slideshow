console.log("😎 Cool loading");


const randomUserEndPoint = 'https://randomuser.me/api/?results='

document.addEventListener('DOMContentLoaded', ()=> {
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        // stops all default functionality like page reloading when we submit a form
        while(peopleList.firstChild) {
            peopleList.removeChild(peopleList.firstChild)
        }
        


        fetch(randomUserEndPoint+input.value)
        .then((fetchedUsers)=>{
            return fetchedUsers.json()
        })
        .then((jsonUsers)=>{
            jsonUsers.results.forEach(addPerson)
            
        })
        .catch((err)=>{
            console.log('Failed to fetch Users!!', err)
        })
        
    })
})