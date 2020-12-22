let searchTerm;
const header = document.getElementById("header");
const searchLabel = document.getElementById("searchLabel");
const image = document.getElementById("image");
const displaySearchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("searchbtn");
const stopBtn = document.getElementById("stop");
const array = [header, searchLabel, image, searchBtn, stopBtn];
let handle;
let redditApi;

//get the search term from the search box when someone hits search
//display the search term on the page

const getSearchTerm = () =>{
    searchTerm = document.getElementById("searchValue").value;
    displaySearchTerm.innerText = `Searching for...${searchTerm.toUpperCase()}`;
    displaySearchTerm.style.display = "block";
    image.style.display = "block";
    stopBtn.style.display = "block";
    searchBtn.style.display = "none";
    header.style.display = "none";
    searchLabel.style.display = "none";
    searchValue.style.display = "none";
    redditApi = `https://www.reddit.com/r/pics/search.json?q=${searchTerm}&restrict_sr=on`;
    fetchReddit();
}



//update const redditAPI to include that search term
//fetch the content
//update the content title
//update the image picture
//continue to update until stop button called

const fetchReddit = () =>{
    fetch(redditApi)
    .then(response => response.json())
    .then(jsonResponse =>{
        postContent(jsonResponse.data.children);
    })
}

const postContent = (redditList) =>{
    let image = document.getElementById("image");
    let i = 0;

    function data() {
            if(redditList[i].data.url_overridden_by_dest === "undefined"){
                i++;
                
            } else{
                image.src = redditList[i].data.url_overridden_by_dest;
                i++;
            }
}
        

        handle = setInterval(data, 5000);
    }

const stopInterval = () =>{
    clearInterval(handle);
    handle = 0;
    displaySearchTerm.style.display = "none";
    image.style.display = "none";
    stopBtn.style.display = "none";
    searchBtn.style.display = "block";
    header.style.display = "block";
    searchLabel.style.display = "block";
    searchValue.style.display = "block";
}

searchBtn.addEventListener("click", getSearchTerm);

stopBtn.addEventListener("click", stopInterval)
