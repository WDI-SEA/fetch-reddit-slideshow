// we need to creat a slide show of cats
// creat all variables needed
// the array for images is in fatched.Obj.data.children
// figure out what to do with it
let start = document.getElementById('start')
let stop = document.getElementById('stop')
let searchURL = 'http://www.reddit.com/search.json?q='
let image = document.getElementById('picsShownHere')
let imgStorage = []
let searchBox = document.getElementById('search')
// let endOfUrl = searchBox.value


function inputSearch () {
    endOfUrl
    console.log('this function is activated', endOfUrl)

}
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('content loaded')


    start.addEventListener('click', ()=>{
        console.log(searchBox.value)
        fetch(searchURL+searchBox.value)
        .then(fetchedObj=>{
            // console.log('this is first then')
            // console.log(fetchedObj)
            return fetchedObj.json()
        })
        .then((response)=>{
            // console.log('second then')
            let children = response.data.children;
            children.forEach((child)=>{
                imgStorage.push(child.data.thumbnail)

                console.log(child.data.thumbnail)
            })  
            // console.log(response.data.children[0].data.thumbnail)
        })
        .then(()=>{
            imgStorage.forEach((img)=>{
                image.src = img
            })    
        })
        .catch((error)=>{
            console.log('you got an error', error)
        })          
    })

})