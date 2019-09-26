let url;
let num = 0;
let imgDiv = document.getElementById("imgDiv");
var form = document.forms[0];
var intervalId;

//somefunction counts num up if less than 25 it will continue adding, someFunction also contains the fetch & promises 
let someFunction = function() {
    if (num < 25) {
        num++
    } else {
        num = 0;
    }
    var fetcher = function(number) {
        let userInput = form.input.value;
        if (userInput !== "") {
            fetch(`https://www.reddit.com/search.json?q=${userInput}+nsfw:no+url:.jpg`)
            .then(function(responseData) {
                return responseData.json();
            })
            .then(function(readableData) {
                var url = readableData.data.children[number].data.url;
                document.getElementById('container').setAttribute('src', url);
            });
        }
    }
    fetcher(num);
}

//function to run when user submits the form, will remove the extra stuff
form.addEventListener('submit', function(e) {
    e.preventDefault();
    intervalId = setInterval(someFunction, 4000);
    document.getElementsByTagName('h1')[0].classList.add('clear');
    document.forms[0].classList.add('clear');
})

//Stop function
document.getElementById('halt').addEventListener('click', function() {
    clearInterval(intervalId);
    document.getElementsByTagName('h1')[0].classList.remove('clear');
    document.forms[0].classList.remove('clear');
    document.getElementById('container').setAttribute('src', "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2")
});