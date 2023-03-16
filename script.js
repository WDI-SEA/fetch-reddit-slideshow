
//select form input
let formInput = document.querySelector("#formInput")
function fetchReddit(e){
    //e.preventDefault()
    //let value = "cats"
    fetch(`http://www.reddit.com/search.json?q=${formInput.value}cats+nsfw:no`)
    .then(result => result.json())
    .then(results => {
        console.log(results.data.children)
        let resultImages = results.data.children.map[child => {
            return{
                url: child.data.url,
                title: child.data.title
            }
        }]
        console.log(resultImages)
    })
    
    .catch(console.warn)
}
//fetchReddit()

let stopBtn = document.querySelector("stopBtn")
stopBtn.addEventListener("click", function(){
    console.log("stop")
})

let submitBtn = document.querySelector("#submitButton")
submitBtn.addEventListener("click", fetchReddit)







/*
document.querySelector("#catClick").addEventListener("click", function(){
    let fetchURL = "http://www.reddit.com/search.json?q=cats+nsfw:no"
    fetch(fetchURL)
    .then(function(response)
     {return response.json()
    })
    .then((res => {console.log(res.data.children)
     let resultImages = results.data.children.map[child => {
            return{
                url: child.data.url,
                title: child.data.title
            }))
    })
    .catch(console.warn)*/