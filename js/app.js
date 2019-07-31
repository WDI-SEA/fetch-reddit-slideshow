// console.log('loaded');

document.getElementById('imageForm').addEventListener('submit', (e) => {
    e.preventDefault();

    var searchQuery = document.getElementById('query').value;
    // console.log('Clicked the form! Search for', searchQuery);

    // imageSrc = []

    // var lastFour = str.substr(-4);
    // function getSuffix(lastFour);

    if (searchQuery) {
        // console.log('not empty!');
        document.getElementById('result-title').textContent = searchQuery;

        fetch('https://www.reddit.com/search.json?q=' + searchQuery)
            .then(function (responseData) {

                return responseData.json();
            })
            .then(function (jsonData) {
                document.getElementById('result').innerHTML = '';



                jsonData.data.children.forEach(function (post) {
                    console.log('post', post.data.post_hint);
                    let divContainer = document.createElement('div');


                    let image = document.createElement('img');
                    image.src = post.data.url;
                    image.style.height = '150px';
                    image.style.width = 'auto';

                    divContainer.append(image);
                    // document.getElementById('result')

                    // if (imageSrc) {
                    // function getSuffix(lastFour){
                    //     imageSrc.push(image);
                    // }
                    
                    
                    // console.log(image);

                    // }
  

                    // function SlideShow() {
                    //     var currentSlide = document.getElementsByClassName('rslt');
                    //     currentSlide(setInterval(slideShow, 2500));

                    //     for ()
                    // }
                    

                   
                    document.getElementById('result').append(divContainer);
                    // h3Title.textContent = 

                    
                });
            });
    }
    else {
        document.getElementById('result-title').textContent = 'please enter image title';

    }
});

// var slides = document.querySelector(image);
// var currentSlide = 0;
// var slideInterval = setInterval(nextSlide, 2000);

// function nextSlide() {
//     slides[currentSlide].getElementById = image;
//     currentSlide = (currentSlide + 1)%slides.length;
//     slides[currentSlide].getElementById = image;
// }