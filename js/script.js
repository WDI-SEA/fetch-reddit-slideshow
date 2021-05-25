document.addEventListener("DOMContentLoaded", () => {
    const requestUrl = "http://www.reddit.com/search.json?q="
    let picYouWantToSee = document.querySelector("#pic")
    let dagGumButton = document.querySelector(".form")
    let picRes = []
    
    dagGumButton.addEventListener("submit", (e) => {
        e.preventDefault()
        
        let searchQuery = input.value
        

        fetch(`${requestUrl}+${searchQuery}`)
            .then((thePic) => {
                return thePic.json()
                
            })
            .then((jsonData) => {
                picRes = jsonData.data
                // domPicShow(picRes)
                console.log("did it work?", jsonData.data.children[0].data.thumbnail)
                domPicShow(picRes)
            })
            .catch((err) => {
                console.log(err)
                return err
            })

    })

    function domPicShow(picUrl) {
        
        let newPic = document.createElement('img')
        console.log(picUrl)
        // newPic.setAttribute('src', picUrl.children[0].data.preview.images[0].source.url);
        //above gets a 403 error 
        newPic.setAttribute('src',picUrl.children[0].data.thumbnail)
        picYouWantToSee.appendChild(newPic)
        console.log('done')
    }


})