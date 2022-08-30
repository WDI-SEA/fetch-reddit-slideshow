
document.addEventListener('DOMContentLoaded', function(e) {
    const input = document.querySelector('#input');
    const form = document.querySelector('form')
    const picture = document.querySelector('#picture');
    const h1 = document.querySelector('h1');
    const stop = document.querySelector('#stop');
    let urlArray = [];
    let titleArray = [];
    let slideShow;


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const redditUrl = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
        fetch(redditUrl)
            .then(data => {
                return data.json()
            })
            .then(dataJson => {
                const validUrl = dataJson.data.children.filter(function(item) {
                    return item.data.thumbnail !== 'self' && item.data.thumbnail !== 'default'
                })
                urlArray = validUrl.map(function(item) {
                    return item.data.thumbnail;
                })
                titleArray = validUrl.map(function(item) {
                    return item.data.title;
                })
            })
            .then(() => {
                let length = titleArray.length;
                let i = 0;
                form.style.display = 'none';
                h1.style.display = 'none';
                stop.style.display = 'block';
                let img = document.createElement('img');
                img.alt = titleArray[i % length];
                img.src = urlArray[i % length];
                i++;
                picture.append(img);
                slideShow = setInterval(function(){
                    while (picture.firstChild) {
                        picture.removeChild(picture.firstChild)
                    }
                    img = document.createElement('img');
                    img.alt = titleArray[i % length];
                    img.src = urlArray[i % length];
                    i++;
                    picture.append(img);
                }, 1000)

            })
            .catch(console.warn);
    })

    stop.addEventListener('click', function(e) {
        clearInterval(slideShow);
        while (picture.firstChild) {
            picture.removeChild(picture.firstChild)
        }
        form.style.display = 'block';
        h1.style.display = 'block';
        stop.style.display = 'none';
        input.value = '';
    })
})
