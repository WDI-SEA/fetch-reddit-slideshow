const search = document.getElementById('search')
let rawArr = []
let imgArr = []
let titleArr = []

const grabImg = () =>{
    console.log("Displaying Img")
    fetch(`https://www.reddit.com/search.json?q=${userInput}`)
    .then(response => response.json())
    .then(data => {
    
        for(let i = 0; i < data.data.children.length; i++){
            
            
            rawArr.push(data.data.children[i].data.url)
            imgArr = rawArr.filter(url => )
            console.log('Success!')
            titleArr.push(data.data.children[i].data.title)
            console.log(imgArr)    
        }
        
    })
    .catch(err =>{
        console.log("failed to load your search results.")
        console.log(err)
    })

    console.log('Fetch is over')
}

const slideShow = () =>{
    for(let i = 0; i < imgArr.length; i++){
        document.getElementById('display').src = `url = ${imgArr[i]}}>`
        console.log(imgArr[i])
        document.getElementById('fetched').textContent = titleArr[i]
        console.log(titleArr[i])
    }
}

timer = setInterval(slideShow, 1000);

const fetchInput = () =>{
    userInput = document.getElementById('userInput').value
    console.log(userInput)
    grabImg();
}
const stop = () =>{
    clearInterval(timer);
}

document.getElementById('stop').addEventListener('click', stop)
search.addEventListener('click', fetchInput)