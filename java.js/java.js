

const Time = function() {
    if (num < 15) {
        num++
    } else {
        num = 0;
    }
    const fetcher = function(number) {
        const userInput = form.input.value;
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
form.addEventListener('submit', function(e) {
    e.preventDefault();
    intervalId = setInterval(Time, 4000);
    document.getElementsByTagName('h1')[0].classList.add('clear');
    document.forms[0].classList.add('clear');
})

document.getElementById('halt').addEventListener('click', function() {
    clearInterval(intervalId);
    document.getElementsByTagName('h1')[0].classList.remove('clear');
    document.forms[0].classList.remove('clear');
    document.getElementById('container').setAttribute('src', "https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2")
}); 