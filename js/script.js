console.log('heyyo')
let input
let displayInterval
let submitBtn = document.getElementById('Go')
let stopBtn = document.getElementById('Stop')
stopBtn.addEventListener('click', e =>{
    e.preventDefault()
    clearBoard()
    clearInterval(displayInterval)
    submitBtn.style.display = 'inline'
    document.querySelector('h1').style.display = 'inline'
    document.querySelector('h3').style.display = 'inline'
    document.querySelector('input').style.display = 'inline'
    stopBtn.style.display = 'none'
    
})
submitBtn.addEventListener('click',e =>{
    e.preventDefault()
    clearInterval(displayInterval)
    input = document.getElementById('input').value
    stopBtn.style.display = 'inline'
    submitBtn.style.display = 'none'
    document.querySelector('h1').style.display = 'none'
    document.querySelector('h3').style.display = 'none'
    document.querySelector('input').style.display = 'none'
    createQuery (input)
})

function createQuery (input) {

    clearBoard()
    console.log(input)
    const query = `http://www.reddit.com/search.json?q=${input}+nsfw:no`

    fetch(query)
    .then((fetchObj)=>fetchObj.json())
    .then((queryJson)=>{
        let arrChildren = queryJson.data.children
        let arrData = arrChildren.map((index)=>{
            return index.data.url
        })
        let arrUrl = arrData.filter((urlIndex)=>{
            let checkEnd = urlIndex.slice(urlIndex.length-4)
            if(checkEnd === '.jpg')
            return urlIndex
        })
        displayImage(arrUrl)
    })
}

function displayImage(images){
    
    let i = 0
    
    displayInterval = setInterval(()=>{
        clearBoard()
        let newImage = document.createElement('img')
        document.getElementById('divImg').appendChild(newImage)
        newImage.classList.add('fade-in')
        newImage.src = images[i]
        if(i < images.length-1)
        i++
        else i = 0
        
    },3000)
    
}

function clearBoard(){
    while(divImg.firstChild){
        divImg.removeChild(divImg.firstChild)
    }
}
