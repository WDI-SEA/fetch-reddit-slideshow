console.log('hi')

const url = document.querySelector('#user-input')
const options = {
    headers: {
        Accept: 'application/json'
    }
}

document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('#form').addEventListener('submit', e => {
        e.preventDefault()
        // fetch image from reddit
        const url = document.querySelector('#user-input')
        const redditUrl = `https://randomuser.me/api/?results=?${url.value}`
        fetch(redditUrl, options)
        // unjsonify the data
        .then(response => response.json())
        .then (jsonData => {
            let imgArray = jsonData.data.children
            imgArray = imgArray((i) => {
                return i.data.post_hint === "image"
            })
            // const image = new Image ()
            // image.src = imgArray[0]
        })
        // clear out the container

        //create a tag for the img
        //set the img to be the front page



    // })