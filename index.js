document.addEventListener("DOMContentLoaded", ()=>{

const submitBtn = document.querySelector("#search")

const options = {
    headers: {
        'Accept': 'application/json'
    }
}

submitBtn.addEventListener("click", () =>{
    const input = document.querySelector("#searchInput")
    const searchValue = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
//step 1 fetch data
    fetch (searchValue, options)
//step 2 jsonify data
    .then(response => response.json())
//step 3 do something with json data
    .then(getSearch => {
        console.log(getSearch.data.children)
    })

    .catch(err => {
        console.warn(err)
    })
})
// grab search fxn coming into imput
// create img gallery
// display imngs
// 

})

























