let userEndPoint=" http://www.reddit.com/search.json?q=+nsfw:no"
let userSearch=""
let searchButton=document.getElementById('searchButton')
let imageArr

let imageSearch=document.createElement('img')
const showImage=(imgSource)=>{
    imageSearch.style.marginTop=20+'px'
    imageSearch.src=imgSource
    images.appendChild(imageSearch)
    console.log(imageSearch)
    console.log(imgSource)
}


searchButton.addEventListener('click',(e)=>{
    imageArr=null
    e.preventDefault()
    userSearch=search.value
    console.log(userSearch)
    
    searchButton.style.visibility="hidden"
    search.style.visibility="hidden"
    stopButton.style.visibility="visible"
      
    
    fetch(`http://www.reddit.com/search.json?q=${userSearch}+nsfw:no`)
    .then((fetchObj)=>{
        console.log(fetchObj)
        return fetchObj.json()
    })
    .then((userData)=>{
        console.log(userData)
 
        console.log(imageArr)
        imageArr=userData.data.children.map((element)=>{
            return element.data.thumbnail
        })
       
    
    })
    .catch((erro)=>{
        console.log(erro)
    })
    let i=0
    
    const imageSlider=()=>{
        if(i<imageArr.length){
            showImage(imageArr[i])
            i++

        }else{
            i=0
        }
    }
    let setIntervalImage=setInterval(imageSlider,2000)
    stopButton.addEventListener('click',(e)=>{
        e.preventDefault()
        searchButton.style.visibility="visible"
        search.style.visibility="visible"
    stopButton.style.visibility="hidden"
    while (images.firstChild) {
        images.removeChild(images.firstChild);
    }
        clearInterval(setIntervalImage)
        
    })
})

