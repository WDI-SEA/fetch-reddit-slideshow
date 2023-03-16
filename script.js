const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingMsg = document.querySelector('#loading');
const slideshow = document.querySelector('#slideshow');
const stopBtn = document.querySelector('#stop');
const results = document.querySelector('#results');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // hide form/title/description
    form.style.display = 'none';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('p').style.display = 'none';

    // show loading message
    loadingMsg.style.display = 'block';

    // fetch related posts from Reddit
    fetch(`https://www.reddit.com/search.json?q=${input.value}`)
        .then(response => response.json())
        .then(data => {
            // hide loading message
            loadingMsg.style.display = 'none';

            // display animation/slideshow of images
            let index = 0;
            const intervalId = setInterval(() => {
                const post = data.data.children[index].data;
                const image = document.createElement('img');
                image.src = post.thumbnail;
                slideshow.appendChild(image);
                index++;
                if (index >= data.data.children.length) {
                    index = 0;
                }
            }, 2000);

            // show stop button
            stopBtn.style.display = 'block';

            // stop animation/slideshow when stop button is clicked
            stopBtn.addEventListener('click', () => {
                clearInterval(intervalId);
                slideshow.innerHTML = '';

                // show form/title/description again
                form.style.display = 'block';
                document.querySelector('h1').style.display = 'block';
                document.querySelector('p').style.display = 'block';

                // clear input field
                input.value = '';

                // hide stop button
                stopBtn.style.display = 'none';
            });
        })
        .catch(error => {
            console.error(error);
            results.textContent = 'Error fetching results. Please try again later.';
            results.style.display = 'block';
        });
});
