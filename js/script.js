// step 1 -- fetch the reddit images by URL
fetch('http://www.reddit.com/search.json?q=sunflowers+nsfw:no')
// step 2 -- Jsonify the data
.then(sunflowerImages => {
    // console.log(sunflowerImages)
    return sunflowerImages.json()
})
.then(returnedSunflowers => {
    // console.log(returnedSunflowers.results)
    //grab the document body
    const body = document.querySelector('body')

    returnedSunflowers.results.forEach(result => {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        h2.innerText = results.title
        const p = document.createElement('p')
        console.log(result.title)
    })
// step 3 -- Display the images in a carousel slideshow
// step 4 -- be a good programmer and handle errors