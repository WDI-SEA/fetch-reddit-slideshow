// https://www.reddit.com/search.json?q=cats+nsfw:no

const baseUrl = 'https://www.reddit.com/search.json?q=nsfw:no+';   //just append search string to end.



window.addEventListener('DOMContentLoaded', () => {
    console.log(`DOM Loaded`);
});

let button = document.getElementsByTagName('button');
button[0].addEventListener('click', (e) => {
    e.preventDefault();
});



