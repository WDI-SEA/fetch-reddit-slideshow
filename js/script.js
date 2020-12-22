var i=0;
function showResult(){
    
    //setTimeout(function(){
        var images;
        var newimages;
        //console.log("http://www.reddit.com/search.json?q="+document.getElementById("searchQuery").value+"+nsfw:no");
        fetch("http://www.reddit.com/search.json?q=cats+nsfw:no")
        .then(quote=>quote.json())
        .then(data=>{
            
            //console.log(data.data.children)
            images=data.data.children;
            //console.log(images);
            
            for(i=0;i<images.length;i++){
                
                images[i]=data.data.children[i].data;
                console.log(images[i].url);
                
                    if(images[i].url.endsWith(".jpg")){
                        document.getElementById("final").src=images[i].url; 
                    
                        //console.log(document.getElementById("final").src);
                    
                    }
                
            }
        
            
            
        });
    //},1000);
    

}
