const requestUrl = "http://www.reddit.com/search.json?q=("input.text")

document.addEventListener("DOMContentLoaded", ()=>{

    form.addEventListener('submit', (e)=>{
        e.preventDefault() // stop browser from refreshing
        // fetch the data
        fetch(requestUrl+input.value)
        .then((responseData)=>{
            //extract the JSON data from the fetch object
            return responseData.json()
        })
        .then((jsonData)=>{
            // the above .then passed our returned json data into this cb
            console.log("JSON DATA:")
            console.log(jsonData.results)
            // addPerson(jsonData.results[0])
            jsonData.results.forEach(addPerson)
        })
        .catch((error)=>{
            // If any error is sent back, you will have access to it here.
            console.log("ERROR!!!!!")
            console.log(error)
        })
    })

    // addPerson receives a RU object and adds their name to the ul
    const addPerson = (person) => {
        // create an new li element
        const li = document.createElement("li")
        // add person's the name as text to the li
        li.textContent = `${person.name.first} ${person.name.last}`
        // add the li to the ul
        // const ul = document.querySelector("ul")
        peopleList.appendChild(li)
    }

})