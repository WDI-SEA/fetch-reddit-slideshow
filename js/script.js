console.log('loading')

let homeUrl = "https://www.reddit.com/search.json?q="
function imageSource(j) {
  document.getElementById('screen').src = j
}
let indexDefault = 0


function getJson(surl) {
  fetch(homeUrl + surl)
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
//returns parsed list from homeUrl, creates list urlList[...] of .jpg only
function getJsonUrl(surl) {
  fetch(homeUrl + surl)
    .then(function (responseData) {
      return responseData.json()
    })
    .then(function (jsonData) {
      urlList = []
      let jurl = jsonData.data.children;
      for (i = 0; i < jurl.length; i++)
        // console.log(jurl[i].data.post_hint)
      if (isImage(jurl[i].data.url)) {
        urlList.push(jurl[i].data.url)
      } else {
        delete jurl[i].data.url
      }
    }
    )
}


//SLIDESHOW()
// iterates through urlList[...], writing each image in order to display, timer using setInterval(), loops.

//STARTBUTTON(u)
// adds eventHandler to element id="showStart"
// calls slideshow, accepts reddit search parameter as argument

//STOPBUTTON()
// adds eventHandler to element id="showStop"
// stops slideshow, using clearInterval in function slideshow()


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