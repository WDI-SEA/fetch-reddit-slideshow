addEventListener('DOMContentLoaded', () => {
    const picture = document.querySelector('#pictures')
    const typingArea = document.querySelector('#sInput')
    const startButton = document.querySelector('#startSlide')
    const stopButton = document.querySelector('#stopSlide')
    let buttonValue = ""
    let pictureArray = [];

    // Search button event listener for click
    startButton.addEventListener('click', (e) => {
        e.preventDefault()
        // sets the the variable "buttonValue" to whatever is in the Search box
        buttonValue = typingArea.value

        // sets url to search up anything on reddit that is under 18 friendly content
        const url = `https://www.reddit.com/search.json?q=${buttonValue}&over_18=false`

        fetch(url)
            .then(theData => {
                return theData.json()
            })
            .then(dataJson => {
                for(let i = 0; i < dataJson.data.children.length; i++) {
                    console.log(dataJson.data.children[i].data.url)
                    pictureArray.push(dataJson.data.children[i].data.url)
                }
                
                
            })
    })

    
})