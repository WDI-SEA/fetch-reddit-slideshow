document.addEventListener('DOMContentLoaded', () => {
    console.log('console running')
    
    let imgUrl
    let timer
    
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
            let index = 0
            
            timer = setInterval(() => {
                imgUrl = jsonData.data.children[index].data.thumbnail
                
                if (index === jsonData.data.children.length) {
                    index = 0
                } else {
                    index++
                }
                
                console.log(jsonData.data.children[index].data.preview.images)
                if (jsonData.data.children[index].data.post_hint === 'image') {
                        display.src = jsonData.data.children[index].data.thumbnail
                    }
            }, 2000)
        })

        // Throw an error if the promise is not fulfilled
        .catch((error) => {
            console.log('error!')
            console.log(error)
        })
        
        pause.onclick = () => {
            clearInterval(timer)
            desc.style.visibility = 'visible'
            pause.style.visibility = 'hidden'
            display.src = ''
        }
    })
})