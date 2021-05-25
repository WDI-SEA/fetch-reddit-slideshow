document.addEventListener("DOMContentLoaded", () => {
    const requestUrl = "http://www.reddit.com/search.json?q="
    let picYouWantToSee = document.querySelector("#pic")
    let dagGumButton = document.querySelector(".form")
    let picRes = []
    
    dagGumButton.addEventListener("submit", (e) => {
        e.preventDefault()
        
        let searchQuery = input.value
        

        fetch(`${requestUrl}+${searchQuery} + nsfw:no`)
            .then((thePic) => {
                return thePic.json()   
            })
            .then((jsonData) => {
                picRes = jsonData.data.children
                domPicShow(picRes)
            })
            .catch((err) => {
                console.log(err)
                return err
            })
    })

    function domPicShow(picUrl) {
        
            picUrl.forEach((image) => {
                
                
                let newPic = document.createElement('img')
                //above gets a 403 error FORBIDDEN
                
                newPic.setAttribute('src',image.data.thumbnail)
               
            picYouWantToSee.appendChild(newPic)
            console.log('done')
             
            })
        
    }
    

})