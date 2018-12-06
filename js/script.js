document.addEventListener("DOMContentLoaded", function(){
document.getElementById("myForm").addEventListener("submit",function(e){
		e.preventDefault();


const results = document.getElementById("results");
let userInput = document.querySelector('input').value;
let requestURL = `https://www.reddit.com/search.json?q=${userInput}+nsfw:no`;
var imageArr = [];


function picFilter(string){
	var jpg = ".jpg";//".png";
	return string.includes(jpg);
}

function addPic(myImage){
	let image = document.createElement("img"); //creating img element
	image.src = myImage;
	results.appendChild(image); //append to results (div parent)
	// document.getElementById("startBtn").addEventListener("click", reset);
}

	fetch(requestURL).then(function(responseData){
		return responseData.json();
	}).then(function(jsonSearch){
		var imageSearch = jsonSearch.data.children;
		imageSearch.forEach(function(item){
			let myItem = item.data.url;
			imageArr.push(myItem);
		})
		var newArray = imageArr.filter(picFilter);
		newArray.forEach(addPic);

	}).catch(function(err){
		console.log("oh no! This error occurred:", err);
	});

// function reset(){
// var reset = document.getElementById("startBtn");
// reset.forEach(function(clear){
// 	newArr = new Array();
// 	addPic();

// });
// }
// document.getElementById("slideShow").addEventListener("click",stop);
// function stop(){
//      document.getElementById("slideShow").style.display = "block";
// }

 $("#form2").hide();
 // document.getElementById("startBtn").addEventListener("click", stopBtn);
 $("#slideShow").show();

setInterval(function() { 
 $('#slideShow')
    .first()
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideShow');
},  3000);

function stopBtn(){
	return newArray = [];
	image.results.removeChild(image);
	addPic();
}

});
});