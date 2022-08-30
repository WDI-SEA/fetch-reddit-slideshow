document.addEventListener("DOMContentLoaded", function() {
})

const button = document.getElementById("search");
const slideShowDiv = document.querySelector(".slideshow");
// button.addEventListener("click", searchReddit);

function searchReddit() {
    const search = document.getElementById("site-search").value
    console.log(search)



    fetch(`http://www.reddit.com/search.json?q=${search}+nsfw:no`, {
        
      })
      .then(redditData => {
        return redditData.json()
    })
    .then(jsonData => {
        //hides search section
        document.querySelectorAll(".hide").forEach(function(el){
            el.classList.add('hidden')
        })
        //hides slideshow on stop
        document.querySelector(".slideshow").classList.remove('hidden')
        
        
        let outputArray = []
        const output = jsonData.data.children.map(child=> child.data.thumbnail);
       for(i = 0; i < output.length; i++){
        outputArray.push(output[i])
       }
       console.log(outputArray)

       // creates stop button
       
       var button = document.createElement('button');
       button.innerText = "Stop";
       button.addEventListener ("click", function() {
        timer = 0
        document.querySelectorAll(".hide").forEach(function(el){
            el.classList.remove('hidden')
        })
        document.querySelector(".slideshow").classList.add('hidden')
        document.querySelector(".slideshow").removeChild(button);
        let outputArray = []
        outputArray.length = 0;
      });
       document.querySelector(".reddit").style.height = "300px";
       document.querySelector(".reddit").style.width = "300px";
       document.querySelector(".slideshow").appendChild(button);


      var img = document.querySelector(".reddit")

      var i = 0
      var timer = setInterval(function(){
        if (i > outputArray.length){
            clearInterval(timer)
            return;
        }
        img.src = outputArray[i++];
      }, 5000)
  
})

    .catch(err => console.warn(err))


    }
