console.log('loading')

let homeUrl = "https://www.reddit.com/search.json?q=pics"
imageSource = document.getElementById('screen').src



function getJson() {
  fetch(homeUrl)
    .then(function (responseData) {
      return responseData.json()
    })
    .then(function (jsonData) {
      console.log(jsonData.data.children[0].data.url)
    })
    .catch(function (error) {
      console.log('error')
      console.log(error)
    })
}

//return all jsonData.data.children[i].data.url
// let jurl = jsonData.data.children.data.url;

//ISIMAGE returns true if a url is an image ending in (.jpg ...)
let isImage = function (u) {
  return u.includes('.jpg')
}

let urlList = [];

function getJsonUrl() {
  fetch(homeUrl)
    .then(function (responseData) {
      return responseData.json()
    })
    .then(function (jsonData) {
      urlList = []
      let jurl = jsonData.data.children;
      for (i = 0; i < jurl.length; i++)
        if (isImage(jurl[i].data.url)) {
          urlList.push(jurl[i].data.url)
        } else {
          delete jurl[i].data.url
        }
    }
    )
}


// function getJsonUrl() {
//   fetch(homeUrl)
//     .then(function (responseData) {
//       return responseData.json()
//     })
//     .then(function (jsonData) {
//       let jurl = jsonData.data.children;
//       for (i = 0; i < jurl.length; i++)
//       if (isImage(jurl[i].data.url)) {
//         console.log(jurl[i].data.url)
//       } else {
//         console.log('hmm')
//       }
//     })
// }


console.log('loaded!!!')