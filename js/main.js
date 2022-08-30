const form = document.querySelector("form")
const goBtn = document.querySelector("button")
const input = document.querySelector("#search")
const tl = document.querySelector("#TL")
const tr = document.querySelector("#TR")
const mm = document.querySelector("#div")
const bl = document.querySelector("#BL")
const br = document.querySelector("#BR")
const main = document.querySelector("#main")
const stopBtn = document.querySelector("#stop")
const grid = document.querySelector(".grid")

let imgArr = []
let vidArr = []


form.addEventListener("submit", e => {
    e.preventDefault();
    imgArr = []
    main.style.visibility = "hidden"
    grid.style.visibility = "visible"
    stopBtn.style.visibility = "visible"
    const redditUrl = `http://www.reddit.com/search.json?q=${input.value}+nsfw:no`
    fetch(redditUrl)
        .then(result => {
            return result.json()
        })
        .then(resultJson => {
            const dataArr = resultJson.data.children
            console.log(dataArr)
            for (let i = 0; i < dataArr.length; i++) {
                const type = dataArr[i].data.post_hint
                if (type === "image") {
                    imgArr.push(dataArr[i].data.url)
                }
                if (type === "hosted:video") {
                    vidArr.push(dataArr[i].data.media.reddit_video.fallback_url)
                }
            }

            let index = 0;
            function slideMM() {
                mm.style.display = "block"
                mm.removeChild(mm.firstChild)
                let imgMM = document.createElement("img")
                imgMM.src = imgArr[index]
                imgMM.alt = "image"
                imgMM.style.maxHeight = "100%"
                imgMM.style.maxWidth = "100%"
                mm.append(imgMM)
                index++
                if (index === imgArr.length - 1) { index = 0; }
            }
            function slideTL() {
                tl.removeChild(tl.firstChild)
                let imgTL = document.createElement("img")
                imgTL.src = imgArr[index + 1]
                imgTL.alt = "image"
                imgTL.style.maxHeight = "100%"
                imgTL.style.maxWidth = "100%"
                tl.append(imgTL)
                index++
                if (index === imgArr.length - 1) { index = 0; }
            }
            function slideTR() {
                tr.removeChild(tr.firstChild)
                let imgTR = document.createElement("img")
                imgTR.src = imgArr[index + 2]
                imgTR.alt = "image"
                imgTR.style.maxHeight = "100%"
                imgTR.style.maxWidth = "100%"
                tr.append(imgTR)
                index++
                if (index === imgArr.length - 1) { index = 0; }
            }
            function slideBL() {
                bl.removeChild(bl.firstChild)
                let imgBL = document.createElement("img")
                imgBL.src = imgArr[index + 3]
                imgBL.alt = "image"
                imgBL.style.maxHeight = "100%"
                imgBL.style.maxWidth = "100%"
                bl.append(imgBL)
                index++
                if (index === imgArr.length - 1) { index = 0; }
            }
            function slideBR() {
                br.removeChild(br.firstChild)
                let imgBR = document.createElement("img")
                imgBR.src = imgArr[index + 4]
                imgBR.alt = "image"
                imgBR.style.maxHeight = "100%"
                imgBR.style.maxWidth = "100%"
                br.append(imgBR)
                index++
                if (index === imgArr.length - 1) { index = 0; }
            }
            const interval1 = setInterval(slideMM, 2000)
            const interval2 = setInterval(slideTL, 2000)
            const interval3 = setInterval(slideTR, 2000)
            const interval4 = setInterval(slideBL, 2000)
            const interval5 = setInterval(slideBR, 2000)

            stopBtn.addEventListener("click", () => {
                mm.style.display = "none"
                grid.style.visibility = "hidden";
                input.value = ""
                main.style.visibility = "visible";
                stopBtn.style.visibility = "hidden";
                clearInterval(interval1)
                clearInterval(interval2)
                clearInterval(interval3)
                clearInterval(interval4)
                clearInterval(interval5)
                mm.innerText = "null"
                tl.innerText = "null"
                tr.innerText = "null"
                br.innerText = "null"
                bl.innerText = "null"
            })
        })

        .catch(console.warn)
})












