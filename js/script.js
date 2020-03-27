const API_URL_BASE = 'http://www.reddit.com/search.json?nsfw:no&q=';
const INTERVAL_DELAY =3000;
const FADE = 4000;
const NUM_IMAGE = 9; //Restricting the slideshow to display 8 images and start again
let currentImages =[];
let currentIndex =0;
let interval = null;


//declare some event handlers
// Form submit
document.getElementById('search-form').addEventListener('submit', (e)=>{
   // prevent the form's behaviour of refershing the page
    e.preventDefault();
    // grab user query
    let userquery = document.getElementById('query').value;
    // make sure the user actually typed something
    if(userquery){
        // perform the search
        fetchReddit(userquery)
    }
    else{
        document.getElementById('h4form').textContent = 'Looks like you are not looking for anything!'
        console.log('enter something')
    }
})

// fetch functions
const fetchReddit =(userquery)=>{
    // call the redit api useing fetch
    console.log('userquery',userquery);
    fetch(API_URL_BASE+userquery)
    .then(response => response.json())
    .then(jsonData=>{
        let results = jsonData.data.children.filter(item=>{
            console.log(item.data.post_hint)
            return item.data.post_hint == 'image';
        }).map((item)=>{
            return {
                title: item.data.title,
                url: item.data.url,
                subreddit: item.data.subreddit,
                upvotes: item.data.upvotes,
                downvotes: item.data.downvotes,
                gold: item.data.gilded >0
            }
        })
        currentImages = results;
        console.log('current images',currentImages);
        if(currentImages.length != 0){
             startSlideshow();
        }
        else{
            document.getElementById('h4form').textContent= 'Try another phrase!';
        }    
        
    })
    .catch(err =>{
        console.log('error',err)
    })
}

//Start the slideshow
const startSlideshow =()=>{
     // hide the search bar
    document.getElementById('search-box').style.display = 'none'
    //show the slideshow div 
    document.getElementById('slideshow').style.display = 'inline-block'
    // display the iamge
    displayCurrent()
     // kick of the interval
     interval= setInterval(displayNext,INTERVAL_DELAY);
}
//display current image
const displayCurrent =()=>{
    // remove previous image if any
    removePrevImg()
    // create an image tag
    let img = document.createElement('img')
    img.id = "image"
    img.src = currentImages[currentIndex].url
    img.alt = currentImages[currentIndex].title
    // create h3 tag
    let h3 = document.createElement('h3');
    h3.textContent =currentImages[currentIndex].title
    // add image tag into dom result div
    document.getElementById('results').append(img);
    document.getElementById('results').append(h3);
    $('img').fadeOut(FADE)
} 

// remove prev image
const removePrevImg=()=>{
    let resultDiv = document.getElementById('results');
    // hasChildNodes checks the child for the Div element
    // it will check if we have image in the Div as child
   console.log(resultDiv.hasChildNodes());
    if(resultDiv.hasChildNodes())
    {    //empty prev images
          let img =document.getElementById('image')
          let h3 = document.getElementsByTagName('h3');
          resultDiv.removeChild(img);
          resultDiv.removeChild(h3[0]);
    }
}

// Updates the next image
const displayNext= ()=>{
    if(currentIndex  == (currentImages.length<NUM_IMAGE ?currentImages.length:NUM_IMAGE)){
        currentIndex = -1;
    }
    currentIndex++;
    displayCurrent();
}

const stopDisplayImg =()=>{
    clearInterval(interval);
    currentImages =[];
    currentIndex =0;
    //display the search box
    document.getElementById('h4form').textContent="";
    document.getElementById('search-box').style.display = 'block';
    document.getElementById('query').value ="";
    //hide the slideshow div 
    document.getElementById('slideshow').style.display = 'none';
}

//Stop button click
document.getElementById('stop-button').addEventListener('click', stopDisplayImg);

