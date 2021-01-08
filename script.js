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
let singleImage = 0
let hideOnClick = document.getElementById('hideOnClick')
let hiddenStop = document.getElementById('hiddenStop')
// let endOfUrl = searchBox.value


function revolver () {
    setInterval(()=>{
        if(imgStorage.length) {
            singleImage = (singleImage +1) %  imgStorage.length;
            image.src = imgStorage[singleImage]
            // console.log(singleImage, imgStorage[singleImage])
        }
    }, 5000)
}
document.addEventListener('DOMContentLoaded', ()=>{

    hiddenStop.addEventListener('click', (e) =>{
        console.log('stop')
        imgStorage = []
        image.style.visibility = 'hidden'
        hideOnClick.style.visibility = 'visible'
        hiddenStop.style.visibility = 'hidden'
        searchBox.value = ''
    })





    start.addEventListener('click', ()=>{
        if(hideOnClick.style.visibility != 'hidden' &&
            hiddenStop.style.visibility != 'visible'){
            hideOnClick.style.visibility = 'hidden'
            hiddenStop.style.visibility = 'visible'
        }

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
                console.log(response)
                // console.log(child.data.thumbnail)
            })
            revolver()  
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