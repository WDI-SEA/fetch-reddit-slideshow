// create a redditEndPoint for some types of searches you want on site
console.log('what up')

const redditEndpoint = 'https://www.reddit.com/search.json?q=kittens'
// const randomRedditEndpoint = 'https://reddit.com/search.jsonq?=dogs'
// const randomRedditEndpoint = 'https://reddit.com/search.jsonq?=birds'
    // create lists in JS for the images to be put in

// when user types what they want to search in the input bar and click
// search images of what they are searching for should appear.

// got it to fetch the ojbect now to put it on screen
fetch(redditEndpoint)
.then((fetchObj)=>{
    console.log('here is the fetch object', fetchObj)
    return fetchObj.json()
})
.then((jsonData)=>{
    console.log('Here is the Json data', jsonData)
})
.catch((error =>{
    console.log('oh no you did NOt make fetch happen')
}))


// create event listener to listen for a submit event

