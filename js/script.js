addEventListener("DOMContentLoaded",function(){
    const form = document.querySelector("form")
    const input =  document.querySelector("input")
    const button = document.querySelector("button")
    const image = document.createElement('img')
    const slides =  document.getElementById("slides")
    const reset =  document.getElementById("reset")
    let slideShow

    console.log(form)
    console.log(button)
    formListener()

function formListener(){
    form.addEventListener('submit', e => {
        e.preventDefault()
        //  Loading Message
        
        console.log(input)
        let toSearch = input.value
        console.log(toSearch)
        form.classList.add("hidden")
        reset.classList.remove("hidden")

        search =`http://www.reddit.com/search.json?q=${toSearch}+nsfw:no`
        fetch(search)
        .then(result =>{
            return result.json()
        })
        .then(mappedResult=>{
            let i = 0
            let arr = mappedResult.data.children
            console.log(arr.length)
            // link = children.forEach(element => {
            //     element.data.thumbnail
            // });
             slideShow = setInterval(function(){
                if(i< arr.length){
                    console.log(mappedResult.length)
                    image.src=  arr[i].data.thumbnail
                    i++
                    // console.log(link)
                    slides.append(image)}else i=0
            },2000)
            // image.src= link
            
        })
        .catch(err=>warn.err(console.log(err)))

        reset.addEventListener('click',function(){
            slides.removeChild(image)
            clearInterval(slideShow)
            reset.classList.add("hidden")
            form.classList.remove("hidden")
        })
    })
}})