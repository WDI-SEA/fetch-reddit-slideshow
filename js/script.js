const searchInput = document.querySelector('#search-input')
const imgContainer = document.querySelector('#img-container')
const clearBtn = document.querySelector('#clear-btn')
const h1 = document.querySelector('h1')
const form = document.querySelector('form')
const img = document.querySelector('img')

let imgUrlArr = []
let search = ''

let imgSpeedInt
let imgSpeedTimeout

let imgIndex = 0

document.addEventListener('DOMContentLoaded',()=>{
    clearBtn.classList.add('hidden')

    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        form.classList.add('hidden')
        h1.classList.add('hidden')
        search = searchInput.value
        fetchImg(search)
        clearBtn.classList.remove('hidden')
        clearBtn.classList.add('visible')
    })
    clearBtn.addEventListener('click', reset)
})

function fetchImg(search){
    const url = `http://www.reddit.com/search.json?q=${search}+nsfw:no&limit=100`
    fetch(url)
        .then(response => response.json())
        .then(json =>{
            imgUrlArr = json.data.children // all the search returns into array
            // console.log(json)
            .filter(function(i){
                return i.data.post_hint === 'image'
            })
            .map(function(k){
                return k.data.url
            }) // get just the url of the imgs into arr
            
            imgSpeedTimeout = setTimeout(()=>{
                img.src = imgUrlArr[0]
                imgIndex = imgIndex + 1
            }, 0)
            
            imgSpeedInt = setInterval(() => {
                if(imgIndex === imgUrlArr.length){
                    imgIndex = 0
                }
                img.src = imgUrlArr[imgIndex]
                imgContainer.append(img)
                imgIndex = imgIndex + 1
            }, 3000);
        })
        .catch(err => console.log(err))
}

function clearInt (){
    clearInterval(imgSpeedInt)
}

function reset(){
    clearInt()
    imgUrlArr = []
    imgIndex = 0
    search = ''
    form.classList.remove('hidden')
    h1.classList.remove('hidden')
    img.src = ''
    searchInput.value = ''

    clearBtn.classList.remove('visible')
    clearBtn.classList.add('hidden')
}

