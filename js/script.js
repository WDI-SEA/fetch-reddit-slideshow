console.log('loading')

let homeUrl = "https://www.reddit.com/search.json?q=cats"



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

function getJsonUrl() {
  fetch(homeUrl)
  .then(function (responseData) {
    return responseData.json()
  })
  .then(function (jsonData) {
    let jurl = jsonData.data.children;
    for (i = 0; i < jurl.length; i++) {
      console.log(jurl[i].data.url)
    }
  })
}



  console.log('loaded!!!')