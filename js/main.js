const form = document.querySelector("form")
const goBtn = document.querySelector("button")
const input = document.querySelector("#search")
const tl = document.querySelector("#TL")
const tr = document.querySelector("#TR")
const mm = document.querySelector("#div")
const bl = document.querySelector("#BL")
const br = document.querySelector("#BR")

const imgArr = []
const vidArr = []


form.addEventListener("submit", e => {
    e.preventDefault();
    const redditUrl = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(redditUrl)
        .then(result => {
            return result.json()
        })
        .then(resultJson => {
            const dataArr = resultJson.data.children
            for (let i = 0; i < dataArr.length; i++) {
                const type = dataArr[i].data.post_hint
                if (type === "image") {
                    imgArr.push(dataArr[i].data.url)
                           }
                if (type === "hosted:video") {
                    vidArr.push(dataArr[i].data.media.reddit_video.fallback_url)
                }}
                console.log(imgArr)
                let index=0;
                function slideShow() {
                let imgMM = document.createElement("img")
                let imgTL = document.createElement("img")
                let imgTR = document.createElement("img")
                let imgBL = document.createElement("img")
                // let vidBR = document.createElement("video")
                imgMM.src = imgArr[index]
                imgMM.style.maxHeight = "200px"
                imgMM.style.maxWidth = "200px"
                mm.append(imgMM)
                // imgTL.src = imgArr[index+1]
                // imgTL.style.maxHeight = "200px"
                // imgTL.style.maxWidth = "200px"
                // tl.append(imgTL)
                // imgTR.src = imgArr[index+2]
                // imgTR.style.maxHeight = "200px"
                // imgTR.style.maxWidth = "200px"
                // tr.append(imgTR)
                // imgBL.src = imgArr[index+3]
                // imgBL.style.maxHeight = "200px"
                // imgBL.style.maxWidth = "200px"
                // bl.append(imgBL)
                // // vidBR.src = vidArr[index]
                // // vidBR.style.maxHeight = "200px"
                // // vidBR.style.maxWidth = "200px"
                // // vidBR.autoplay = "true"
                // // br.append(vidBR)
                index++
                if (index === imgArr.length - 1) {index = 0;}
                mm.removeChild(firstChild)
                // tl.removeChild(tl.firstChild)
                // tr.removeChild(tr.firstChild)
                // bl.removeChild(bl.firstChild)
                // br.removeChild(tl.firstChild)
}
            setInterval(slideShow, 2000)})

            

            .catch(console.warn)
        })










