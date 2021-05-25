document.addEventListener("DOMContentLoaded", () => {
    console.log("working")

    // store constant url for form dom element; request url
    let inputForm = document.querySelector("form")

    let stopButton = true

    let imageList = document.querySelector("#imageList")

    const requesturl =`https://www.reddit.com/search.json?q=`

    let timer = 0
    

    let imgRes = []
    let redditImg = ""

    // REQUEST DATA 
    //take form element and prevent default behavior
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault()
        stopButton = false
        // get user inputed number
        let userInput = input.value
       
       
       
        

        //timing
        function tick(){
            if(timer>imgRes.length){
                timer=0
            }
            document.getElementById("image").src = imgRes[timer]
            document.getElementById("image").width = "300"
            timer++
            // console.log(timer)
           
        }



        // make fetch request to const api url with given user number
        fetch(requesturl + userInput + "&limit=100")

            // .then --> take response data and format
            .then((res) => {
                
                return res.json()
            })



            // .then use response JSON data
            .then((jsonData) => {

                // console.log(jsonData)
                imgRes = []
                for(i=0; i<=24; i++){
                    
                    redditImg = jsonData.data.children[i].data.url
                    // console.log(jsonData.data.children[i].data.url)
                    if (typeof(redditImg) != "undefined"&&(redditImg.includes(".jpg")||redditImg.includes(".png"))){
                    
                        // console.log(redditImg)
                        imgRes.push(redditImg)
                    }
                    
                    
                    //add function here that takes in list/arr
                    
                    
                } //End of for loop
                
                let clock = setInterval(tick, 4000)
                
                document.getElementById("stop").addEventListener("click", () =>{
                    stopButton = true
                    clearInterval(clock)
                    console.log("stopped")
                    document.getElementById("image").alt = "🐱"
                    document.getElementById("image").src = ""
                })





            }) // End of 2nd .then



            // .catch to catch errors
            .catch((err) => {
                console.log(err)
                //pass
            })
            
    }) //End of event listener of submit button




}) //End of DOM