document.addEventListener('DOMContentLoaded', () => {
    console.log('console running')
    
    let imgUrl
    let timer
    let index = 0
    let imgArray = []
    
    function deleteChildren() {
        while (imageBank.firstChild) {
            imageBank.removeChild(imageBank.firstChild)
        }
    }
    
    let requestURL

    document.addEventListener('submit', (e) => {
        e.preventDefault()
        desc.style.visibility = 'hidden'
        pause.style.visibility = 'visible'
        requestURL = 'https://www.reddit.com/search.json?q=' + input.value
        
         // Promise statement - resolve this fetch statement
        fetch(requestURL)

        // THEN run this, once the fetch has been resolved
        .then((responseData) => {
            return responseData.json()
        })

        // This catches the data returned from the previous .then, populating the jsonData variable
        .then((jsonData) => {
            for (let i = 0; i < jsonData.data.children.length; i++) {
                if (jsonData.data.children[i].data.thumbnail.includes('.jpg')) {
                        imgArray.push(jsonData.data.children[i].data.thumbnail)
                    }
            }
        })

        // Throw an error if the promise is not fulfilled
        .catch((error) => {
            console.log('error!')
            console.log(error)
        })
        
        console.log(imgArray)
        
        timer = setInterval(() => {
                
                if (index === imgArray.length-1) {
                    index = 0
                } else {
                    index++
                }
            
                console.log(index)
                
                display.src = imgArray[index]
            
            }, 2000)
        
        pause.onclick = () => {
            clearInterval(timer)
            desc.style.visibility = 'visible'
            pause.style.visibility = 'hidden'
            display.src = ''
        }
    })
})