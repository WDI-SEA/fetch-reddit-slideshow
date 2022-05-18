






// let intervalObj
// let stopBtn
// let stopBtn
// let imgEl
// let imgs = []
// const render = () => {
//     form = document.querySelector('#form-container')
//     form.style.display = 'block'
//     form.search.value = ''
//     imgEl = document.querySelector('#img')
//     img.style.display = 'none'
// }
// const formHandleSubmit = (event) => {
//     event.preventDefault()
//     const searchTerm = event.target.search.value
//     const url = `http://www.reddit.com/search.json?q=${searchTerm}+nsfw:no`
//     redditFetch(url)
//     let formBox = document.querySelector('#form-container')
//     //formBox.style.display = 'none'

// }
// const stopFetch = () => {
//     clearInterval(intervalObj)
//     render()
// }

// const redditFetch = (urlParam) => {
//     const option = {
//         headers: {
//             'Accept': "application/json"
//         }
//     }

//     fetch(urlParam, options)
//     .then(response => response.json())
//     .then(jsonData => {
//         images = jsonData.data.children.map(image => {
//             return {
//                 title: image.data.title,
//                 url: image.data.url
//             }
//         })
//         .filter(image => image.url.slice(-4) === '.jpg' ||image.url.slice(-4) === 'png')
//     })
//     .then(() => {
//         imgEl = document.querySelector('#img')
//         imgEl.style.display = 'block'
//         imgEl.src = images[0].url
//         let count = 1
//         intervalObj = setInterval(() =>{
//             if (count < images.length){
//                 imgEl.src = images[count].url
//                 count++
//             }
//         }, 4000)
//      })
// }
document.addEventListener('DOMContentLoaded', () => {

    render()
    form = document.querySelector('#form').addEventListener('submit', formHandleSubmit)
    stopBtn = document.querySelector('#btn-stop').addEventListener('click', stopFetch)


	const peopleList = document.querySelector('#people-list')
	document.querySelector('#form').addEventListener('submit', e => {
		e.preventDefault()
        // items = document.querySelector('#items')
        // items.removeChild()
		const userInput = document.querySelector('#user-input').value
        console.log(userInput)

		const url = `http://www.reddit.com/search.json?q=${userInput}+nsfw:no`

        //let parentDiv = document.createElement('div')

        let parentDiv = document.querySelector('#parent')
		fetch(url)
			// jsonify user data

			.then(responseData => responseData.json())
			// do something with the json data

			.then(jsonData => {
				 console.log(jsonData) // of the
                 let results = jsonData.data.children
                 console.log(results)
                 for (let i = 0; i < jsonData.data.children.length; i++){
                    if(jsonData.data.children[i].data.post_hint === 'image'){
                        let image = document.createElement('img')
                        console.log('hi')
                         image.src = jsonData.data.children[i].data.url_overridden_by_dest
                         //div.appendChild(image)
                         parentDiv.appendChild(image)
                    }
                 }

			})
			.catch(err => {
				console.warn('ut ohhhhhh spaghetti-OH', err)
			})
	})


})
