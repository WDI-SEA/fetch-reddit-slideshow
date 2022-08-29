const form = document.querySelector('form')
const input = document.querySelector('#searchBar')
const button = document.querySelector('button')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('working')
    input.value = ''
    input.style.display = 'none'
    button.innerText = 'END'
    button.addEventListener('click', () => {
        console.log('working')
        input.style.display = 'flex'
    })

})