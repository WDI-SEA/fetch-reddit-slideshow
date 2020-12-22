

// when user enters search - hide everything initially on page
//
//fetch posts from reddit with (fetch)

//display animation/slideshow of imgs

//show button to stop/reset animation

//repeat until user clicks stop



//
const submit = document.getElementById('go');

document.addEventListener("DOMContentLoaded",() => {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
    })
})

