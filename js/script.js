addEventListener('DOMContentLoaded', () => {
    const picture = document.querySelector('#pictures')
    const typingArea = document.querySelector('#sInput')
    const startButton = document.querySelector('#startSlide')
    const stopButton = document.querySelector('#stopSlide')
    const heading = document.querySelector('h1')

    let buttonValue = ""
    let pictureArray = [];
    const images = document.createElement('img')
    const heading2 = document.querySelector('h2')
    heading2.style.display = 'none'
    let anInterval;
    let loadingTimer;

    function hideExtra() {
        heading.style.display = 'none'
        typingArea.style.display = 'none'
        startButton.style.display = 'none'
        stopButton.style.display = 'block'
        loadingTimer = setTimeout(() => {
            heading2.style.display = 'block'
        }, 0)
    }

    function showExtra() {
        heading.style.display = 'block'
        typingArea.style.display = 'block'
        startButton.style.display = 'block'
        stopButton.style.display = 'none'
    }
    
    // Search button event listener for click
    startButton.addEventListener('click', (e) => {
        e.preventDefault()
        // sets the the variable "buttonValue" to whatever is in the Search box
        buttonValue = typingArea.value

        hideExtra()

        setTimeout(() => {
            heading2.style.display = 'none'
            images.style.display = 'block'
        }, 2050)

        // sets url to search up anything on reddit that is under 18 friendly content
        const url = `https://www.reddit.com/search.json?q=${buttonValue}&over_18=false`

        fetch(url)
            .then(theData => {
                return theData.json()
            })
            .then(dataJson => {
                pictureArray = [];
                for(let i = 0; i < dataJson.data.children.length; i++) {
                    if(dataJson.data.children[i].data.domain === "i.redd.it"){
                        pictureArray.push(dataJson.data.children[i].data.url)
                    }
                    
                }
                return pictureArray
            })
            .then(theArray => {
                
                let k = 0;
                anInterval = setInterval(() => {
                    images.src = `${theArray[k]}`
                    images.alt = `${buttonValue} result`
                    area.append(images)
                    k++
                    if(k === theArray.length) k = 0;
                    console.log(theArray[k])
                }, 2000)
                
            })
            .catch(err => {
                console.warn(err)
            })
    })
    
    stopButton.addEventListener('click', (e) => {
        e.preventDefault()

        showExtra()
        
        clearInterval(anInterval)
        images.style.display = 'none'
    })
})