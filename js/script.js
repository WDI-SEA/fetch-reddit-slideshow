console.log('Loaded')

const displayImage = () => {
	console.log("displaying a quote now...")
	fetch(`https://www.reddit.com/search.json?q=${userInput}`)
	.then(response => response.json())
	.then(data => {
		console.log('Success')
        // console.log()
        document.getElementById('fetched').textContent = data.data.children[0].data.title
        document.getElementById('myImage').innerHTML = `<img src=${data.data.children[0].data.url}>`
        console.log('made it to here')
	})
	.catch(err => {
		console.log('Error')
		console.log(err)
	})
}
document.addEventListener('DOMContentLoaded', () => {
    const getInputText = () => {
        let  str = document.getElementById('userInput').value
        console.log(str)
        displayImage()
        // document.getElementById('captured').textContent = str
    }
    
})