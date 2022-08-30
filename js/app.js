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
            console.log(searchDataJson.data)
            let lengthOfChildren = searchDataJson.data.children.length
            for (let i = 0; i < lengthOfChildren; i++) {
                const img = document.createElement('img')
                img.src = searchDataJson.data.children[i].thumbnail
                photoZone.append(img)

            }
            })
        })