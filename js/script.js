addEventListener('DOMContentLoaded', () => {
    const picture = document.querySelector('#pictures')
    const typingArea = document.querySelector('#sInput')
    const startButton = document.querySelector('#startSlide')
    const stopButton = document.querySelector('#stopSlide')
    let buttonValue = ""

    // Search button event listener for click
    startButton.addEventListener('click', (e) => {
        e.preventDefault()
        // sets the the variable "buttonValue" to whatever is in the Search box
        buttonValue = typingArea.value
        const url = `https://www.reddit.com/search.json?q=${buttonValue}+nsfw:no`

        fetch(url)
            .then(theData => {
                return theData.json()
            })
            .then(dataJson => {
                console.log(dataJson.data.children[1])
            })
    })

    // creates url that allows you to search whatever on reddit without nsfw content
    
})