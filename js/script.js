inputSpace= document.getElementById('word')
myForm= document.querySelector('form')
header= document.querySelector('h1')
img= document.getElementById('img')
clear= document.getElementById('clear')

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    let searchWord = inputSpace.value
    const requestURL= "http://www.reddit.com/search.json?q=" + searchWord +"+nsfw:no"
    fetch(requestURL)
        .then(responseData => responseData.json())
        .then((data) => {
            console.log(data)
            dataArray= data.data.children

    const filteredURLData = dataArray.map(function(child){
        return child.data.url
    })

    const imageArray = filteredURLData.filter(function(eachURL){
        return /\.(jpg|jpeg|png)$/.test(eachURL)
    })
    console.log(imageArray)

    header.innerText = `Reddit Images for ${inputSpace.value}`
    myForm.style.display ="none";


    let imageCounter = 0
    function flashImage(){
        img.src= imageArray[imageCounter]
        if(imageCounter<imageArray.length -1){
            imageCounter++
        } else{
            imageCounter = 0
        }
    }
    flashImage()
    let ticker = setInterval(flashImage, 2000)
    clear.style.display = "block";
    clear.addEventListener("click", () =>{
        clearInterval(ticker)
        img.src= ''
        imageCounter = 0
        header.innerText = "Reddit Image Search"
        myForm.style.display = "block"
        clear.style.display = "none"
        inputSpace.value = ''
    })

    })
})

