

// when user enters search - hide everything initially on page
//
//fetch posts from reddit with (fetch)

//display animation/slideshow of imgs

//show button to stop/reset animation

//repeat until user clicks stop



//
const submit = document.getElementById('go');
const searchBar = document.getElementById('search');

function fetchReddit() {
    fetch("http://www.reddit.com/search.json?q=cats+nsfw:no")
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            console.log(jsonData);
        })
}

document.addEventListener("DOMContentLoaded",() => {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        fetchReddit();
        console.log(searchBar.value);
    })
})

