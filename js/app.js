const form = document.querySelector('form')
const input = document.querySelector('#searchBar')
const button = document.querySelector('button')
const photoZone = document.querySelector('#photoContainer')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('working')
    let search = input.value
    input.value = ''
    input.style.display = 'none'
    button.innerText = 'END'
    button.addEventListener('click', () => {
        console.log('working')
        input.style.display = 'flex'
    })
    fetch(`http://www.reddit.com/search.json?q=${search}`)
        .then(searchData => {
            return searchData.json()
        })
        .then(searchDataJson => {
            let children = searchDataJson.data.children
            children.forEach(photo => {
                setInterval(() => {
                    console.log(photo.data.url)
                    // let photoUrl = children.data.url
                    // const img = document.createElement('img')
                    // img.src = photoUrl
                    // photoZone.append(img)
                }, 3000)
                
            });
            
            // for (let i = 0; i < 20; i++) {
            //     if (children.is_video === false ) {
            //         // console.log(children)
            //         let photoUrl = children.url
            //         const img = document.createElement('img')
            //         img.src = photoUrl
            //         photoZone.append(img)
            //         count++
            //     }
            //     console.log(count)

            // }
            })
        })