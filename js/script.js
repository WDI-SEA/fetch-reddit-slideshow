let arr = [];
let index = 0;
const input = document.querySelector("#input")
const imageContainer = document.querySelector('.imageContainer')



document.querySelector('#form').addEventListener("submit", (e) => {
    e.preventDefault(); 
    document.querySelector('.clear').classList.remove("hidden");
    document.querySelector('#form').classList.add("hidden");
    const images = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(images)

.then((imageData) => imageData.json())
.then(jsonImage => {
  jsonImage.data.children.forEach(child => {
      arr.push(child.data.url)
  })

  const filterArray = arr.filter(url => {
       return url.includes('.jpg') || url.includes('.gif') || url.includes('.png')
  })

  //changes all the gifv to gif 
const mapedArray = filterArray.map(url => {
   return url.replace('gifv',"gif")
})

arr = mapedArray

console.log(jsonImage.data.children)
  
  startShow();

})
.catch((err) => {
      console.log("ERROR:", err);
    });

    
})



const startShow = () => {
    if(imageContainer.firstChild){
      imageContainer.firstChild.remove()
    }

     const newImage = new Image()
     newImage.classList.add("imageSize")
    newImage.src = arr[index]
    newImage.alt = arr[index]
    imageContainer.append(newImage)

    const slideShow = setInterval(() => {
        newImage.src = arr[index]
        newImage.alt = arr[index]
        if(index < arr.length - 1){
          index++
        }else{
            index = 0;
        }
        
    }, 1000)
    document.querySelector('.clear').addEventListener("click", () => {
        clearInterval(slideShow);
         arr = [];
         index = 0;
         document.querySelector('#form').classList.remove("hidden");
          document.querySelector('.clear').classList.add("hidden");
          imageContainer.firstChild.remove()
    })
}

