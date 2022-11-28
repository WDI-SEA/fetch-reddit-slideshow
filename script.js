document.addEventListener('DOMContentLoaded', ()=>{
let clear = document.getElementById('clear')
clear.style.display='none'
let img = document.getElementById('image')
let link = ' ';
let time = null;
let clearTime = null;
let end = false;
let form = document.querySelector('form')
document.querySelector('form').addEventListener('submit', e=>{
    e.preventDefault()
    end = false
    let enter = document.getElementById('enter').value
    clear.addEventListener('click', function(){
        clearTime= clearInterval(time)
        img.src = null
        end = true
        form.style.display='block'
        clear.style.display='none'
    })
    link = `https://www.reddit.com/search.json?q=${enter}+nsfw:no`
    fetch(link)
    .then(responseData=> responseData.json())
    .then(reddit=>{
        let arr = []    
        for(let i in reddit.data.children){
            let urll = reddit.data.children[i].data.url
            arr[i]= reddit.data.children[i].data.url
        }
        
        let filtered = arr.filter(function(u){
            if(u.substr(0,11) == "https://i.r"){
                //this checks to make sure that url is an image and not a video or something else
                return true
            }
            else{
                return false;
            }
        })
        
        form.style.display= 'none'
        clear.style.display='inline'


            let h =0
        // img.src=`${filtered[h]}` 
        // img.classList.toggle("fade")
        // h++ 
            time = setInterval(function(){
            if(h<filtered.length && end ==false){
                // h == 0 ? : console.log("no")
                img.src=`${filtered[h]}`  
                img.classList.toggle("fade")
            }
            h++
            },4000) 
            
    })
}) 


})