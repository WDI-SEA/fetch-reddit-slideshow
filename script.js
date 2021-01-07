const redditEndpoint = 'https://www.reddit.com/search.json?q='
let picURLS = []
let myImage = null
i = 0
let displayPic = document.getElementById('displayPic')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('form submitted')
    
    fetch(redditEndpoint + event.target.searchBox.value)
        .then((fetchedPics) => {
            return fetchedPics.json()
        })
        .then((jsonPics) => {
            picURLS = jsonPics.data.children.map((result) => {
                return result.data.url
            })
            displayPic.src = picURLS[0]
            sleep(2000).then(() => {displayPic.src = picURLS[1]})
            sleep(4000).then(() => {displayPic.src = picURLS[2]})
            sleep(6000).then(() => {displayPic.src = picURLS[3]})
            sleep(8000).then(() => {displayPic.src = picURLS[4]})
            sleep(10000).then(() => {displayPic.src = picURLS[5]})
            sleep(12000).then(() => {displayPic.src = picURLS[6]})
            sleep(14000).then(() => {displayPic.src = picURLS[7]})
            sleep(1600).then(() => {displayPic.src = picURLS[8]})
            sleep(18000).then(() => {displayPic.src = picURLS[9]})
            sleep(20000).then(() => {displayPic.src = picURLS[10]})
            sleep(22000).then(() => {displayPic.src = picURLS[11]})
            sleep(24000).then(() => {displayPic.src = picURLS[12]})
            sleep(26000).then(() => {displayPic.src = picURLS[13]})
            sleep(28000).then(() => {displayPic.src = picURLS[14]})
            sleep(30000).then(() => {displayPic.src = picURLS[15]})
            sleep(32000).then(() => {displayPic.src = picURLS[16]})
            sleep(34000).then(() => {displayPic.src = picURLS[17]})
            sleep(36000).then(() => {displayPic.src = picURLS[18]})
            sleep(38000).then(() => {displayPic.src = picURLS[19]})
            sleep(40000).then(() => {displayPic.src = picURLS[20]})
            sleep(42000).then(() => {displayPic.src = picURLS[21]})
            sleep(44000).then(() => {displayPic.src = picURLS[22]})
            sleep(46000).then(() => {displayPic.src = picURLS[23]})
            sleep(48000).then(() => {displayPic.src = picURLS[24]})
        })
        .catch((error) => {
            console.log('Failed to fetch pics')
        })
})

