var button1 = document.querySelector("#button1");
var button2 = document.querySelector("#button2");
var button3 = document.querySelector("#reset");
var bo = parseInt(document.querySelector("#bo").textContent);
var inputBo = document.querySelector("input");
var score1 = 0;
var score2 = 0;
gaming = true;

button1.addEventListener("click", function(){
    if(gaming){
        score1 += 1;
        document.querySelector("#score1").textContent = score1;
    }
    if(score1 >= bo){
        document.querySelector("#score1").style.color = "green";
        gaming = false;
    }
});
button2.addEventListener("click", function(){
    if(gaming){
        score2 += 1;
        document.querySelector("#score2").textContent = score2;
    }
    if(score2 >= bo){
        document.querySelector("#score2").style.color = "green";
        gaming = false;
    }
});

button3.addEventListener("click", function(){
    gaming = true;
    score1 = 0;
    score2 = 0;
    document.querySelector("#score1").textContent = score1;
    document.querySelector("#score2").textContent = score2;
    document.querySelector("#score1").style.color = "";
    document.querySelector("#score2").style.color = "";
})

inputBo.addEventListener("click", function(){
    bo = inputBo.value;
    document.querySelector("#bo").textContent = bo;
})