console.log('Script is running');
const pictureHere = document.getElementById('pictures')
let title = document.querySelector('h1')
let description = document.querySelector('h3')
let textBox = document.getElementById('textHere')
let searchButton = document.getElementById('search')
let searchHidden = searchButton.getAttribute('hidden')
let stopButton = document.getElementById('stop')
let stopHidden = stopButton.getAttribute('hidden')

let storePicture = []

const addSearch = () => {
    // get info of what user typed in
    searchButton.setAttribute('hidden', 'hidden')
    title.setAttribute('hidden', 'hidden')
    description.setAttribute('hidden', 'hidden')
    textBox.setAttribute('hidden', 'hidden')
    stopButton.removeAttribute('hidden', 'hidden')
    let text = document.getElementById("textHere").value
    console.log(text)
    let search = 'https://www.reddit.com/search.json?q=' + text + "+nsfw:no"
    console.log(search)
    fetch(" " + search)
    .then(function(responseData) {
        return responseData.json();
    })
    .then(function(jsonData) {
        console.log("Here is the data:", jsonData.data.children);
        let getPicture = jsonData.data.children
        // getPicture.forEach(function(animal) {
            //     console.log(animal)
            // });
            for (let i = 0; i < getPicture.length; i++) {
                console.log(getPicture[i].data.url)
                if (getPicture[i].data.url.includes(".jpg")) {
                    storePicture.push(getPicture[i].data.url)
                } else if (getPicture[i].data.url.includes(".png")) {
                    storePicture.push(getPicture[i].data.url)
                }
            }
            console.log(storePicture);
        })
        .then(function postFirst() {
            let i = 0
            const img = new Image();
            img.src = ' ' + storePicture[i]
            pictureHere.append(img);
            i = i + 1
            const postDelay = () => {
            if (storePicture.length > i) {
                img.src = ' ' + storePicture[i];
                console.log(i)
                pictureHere.append(img);
                i = i + 1
                console.log('picturepost')
            } else if (storePicture.length == i) {
                i = 0;
                img.src = ' ' + storePicture[i];
                pictureHere.append(img);
                i = i + 1
                console.log('picturepostReset')
            }
        }
        let slideshow = setInterval(postDelay, 5000)
        const clearSlide = () => {
            clearInterval(slideshow)
            img.remove()
        }
        const stopIt = () => {
                clearSlide()
                storePicture = []
                stopButton.setAttribute('hidden', 'hidden')
                searchButton.removeAttribute('hidden', 'hidden')
                title.removeAttribute('hidden', 'hidden')
                description.removeAttribute('hidden', 'hidden')
                textBox.removeAttribute('hidden', 'hidden')
                textBox.value = ""
        }
        stopButton.addEventListener('click', stopIt)
    })
    .catch(console.warn)
    console.log('Just fired AJAX request!');
}
searchButton.addEventListener('click', addSearch);