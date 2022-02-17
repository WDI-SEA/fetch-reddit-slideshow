let mappedArr = [];
const imgWrapDiv = document.querySelector('.imgWrapper');
const stopBtn = document.querySelector('.stop');
const title = document.querySelector('.title');
const description = document.querySelector('.description');
let imgList = [];
let imgArr = [];
let time;

const fetchData = () => {
	let inputValue = document.getElementById('search').value;
	let endpoint = `http://www.reddit.com/search.json?q=${inputValue}+nsfw:no`;
	fetch(endpoint).then((fetchObj) => fetchObj.json()).then((jsonData) => {
		for (let i = 0; i < jsonData.data.children.length; i++) {
			filteredPhotos(jsonData.data.children[i].data.url);
		}
		setImgSrc();
	});
};

const submitForm = () => {
	fetchData();
	document.querySelector('.imgInsert').style.display = 'block';
	document.querySelector('form').style.display = 'none';
	title.style.display = 'none';
	description.style.display = 'none';
	setTimeout(() => {
		stopBtn.style.display = 'block';
	}, 1900);
};

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault();
	submitForm();
});

stopBtn.addEventListener('click', () => {
	document.querySelector('.imgInsert').src = '';
	document.querySelector('.imgInsert').style.display = 'none';
	clearInterval(time);
	mappedArr = [];
	document.querySelector('form').style.display = 'block';
	stopBtn.style.display = 'none';
	title.style.display = 'block';
	description.style.display = 'block';
	document.getElementById('search').value = '';
});

const filteredPhotos = (value) => {
	if (value.includes('.jpg')) {
		mappedArr.push(value);
	}
};

const setImgSrc = () => {
	let i = 2;
	time = setInterval(() => {
		if (mappedArr.length > i) {
			document.querySelector('.imgInsert').style.backgroundImage = `url('${mappedArr[i]}')`;
			i++;
		} else {
			i = 0;
		}
	}, 1100);
};
