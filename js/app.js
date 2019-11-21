console.log('Tuda!')


const displayQuote = () => {
	console.log("displaying a quote now...")
    fetch('https://www.reddit.com/search.json?q=cat+nsfw:no')
    //let input = document.getElementById('ibnputString').textContent
	.then(response => response.json())
	.then(data => {
		console.log('Success')
        console.log()
        document.getElementById('fetched').textContent = data.data.children[0].data.title
        document.getElementById('c0').innerHTML = `<img height="25%" width="25%" src=${data.data.children[0].data.url}>`
        document.getElementById('c1').innerHTML = `<img height="25%" width="25%" src=${data.data.children[1].data.url}>`
        document.getElementById('c2').innerHTML = `<img height="25%" width="25%" src=${data.data.children[2].data.url}>`


        console.log('made it to here')
	})
	.catch(err => {
		console.log('Error')
		console.log(err)
	})
}

document.addEventListener('DOMContentLoaded', () => {
    const getInputText = () => {
        let  str = document.getElementById('searchString')
        document.getElementById('captured').textContent = str
    }
    displayQuote()
})