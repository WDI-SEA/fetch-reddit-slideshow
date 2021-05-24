document.addEventListener("DOMContentLoaded", () => {
    console.log("working")

    // store constant url for form dom element; request url
    let inputForm = document.querySelector("form")

    let stopButton = true

    let imageList = document.querySelector("#imageList")

    const requesturl =`https://www.reddit.com/search.json?q=`

    

    let imgRes = []
    let redditImg = ""

    // REQUEST DATA 
    //take form element and prevent default behavior
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault()
        stopButton = false
        // get user inputed number
        let userInput = input.value
        


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
                // console.log(imgRes)
                domImageMaker(imgRes)
                // setInterval(domImageMaker(imgRes), 5000)
                
                





            }) // End of 2nd .then



            // .catch to catch errors
            .catch((err) => {
                console.log(err)
                //pass
            })
            
    }) //End of event listener of submit button



// Need function to take list and make slideshow


document.getElementById("stop").addEventListener("click", () =>{
    stopButton = true
    clearInterval()
    console.log("stopped")
})
    

    //RESPONSE DATA
    // collect formated data
    function domImageMaker(resArr) {
        
        for(num of resArr){

            document.getElementById("image").src = num
            document.getElementById("image").width = "300"
            
        }

        
            
    }//end of funct

    


    
        
        

            // if you get to end of list, start at beginning again
 
        //     resArr.forEach((result) => {
                   
        //         // create an li element for each response
                
        //         //need to get IMG/SRC and cycle through pictures + stop button
        //         // let li = document.createElement("img")
        //         // li.src = result
        //         document.getElementById("image").src = result
        //         document.getElementById("image").width = "300"
        // }) //end of forEach
        
    // } //end of funct

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }
        

 
            document.getElementById("stop").addEventListener("click", () =>{
                stopButton = true
                clearInterval()
                console.log("stopped")
            })
            

   




}) //End of DOM