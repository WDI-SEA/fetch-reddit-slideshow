var gallery = document.getElementById('gallery');
var imagesArray = [];
const generateRandomColor = () =>{
  let color = Math.floor(Math.random() * 255);
  return color;
};
const updateBackground = () => {
  var newGradient = `linear-gradient(217deg, rgba(${generateRandomColor()},${generateRandomColor()},${generateRandomColor()},.8), rgba(${generateRandomColor()},${generateRandomColor()},${generateRandomColor()},0) 70.71%);`;
  console.log(newGradient);
  document.getElementById('body').style.background = newGradient;
};
const setUpdateInterval = () =>{
  document.getElementById('controls').innerHTML = '';
  var index = 0;
  var id = setInterval(()=>{
    let postImg = document.createElement('img');
    postImg.src = decodeURI(imagesArray[index]);
    postImg.classList.add('images');
    gallery.innerHTML = '';
    gallery.appendChild(postImg);
    index++;
    if (index >= imagesArray.length) {
      clearInterval(id);
    }
  }, 5000);
};

const handleSubmit = (event) =>{
  event.preventDefault();
  gallery.innerHTML = '';
  var searchQuery = document.getElementById('query').value;
  if (searchQuery) {
    fetch(`http://www.reddit.com/search.json?q=${searchQuery}+nsfw:no`)
    .then((responseData)=>{ return responseData.json(); })
    .then((jsonData)=>{
      console.log(jsonData.data);
      jsonData.data.children.forEach((post) =>{
        if (post.data.post_hint === 'image') {
          imagesArray.push(post.data.url);
        }
      });
    });
  }
  var button = document.createElement('button');
  button.innerText = 'Reset';
  button.classList.add('btn')
  button.addEventListener('click', handleClick);
  document.getElementById('body').appendChild(button);
  setUpdateInterval();
  setInterval(updateBackground(), 500);
};

document.getElementById('form').addEventListener('submit', handleSubmit);
setInterval(updateBackground(), 500);
