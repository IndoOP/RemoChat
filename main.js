let bars = document.getElementById("bars");
let linkList = document.getElementById("linkList");
let bar = document.querySelector("[id='bar']")

bars.addEventListener('click', function(){
    if (linkList.className == "linkList"){
        linkList.className += " visible";
        bars.className += " toggled";
    }
    else{
        linkList.className = "linkList";
        bars.className = "bars";
    }
})