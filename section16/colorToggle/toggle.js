var button = document.querySelector("button")

// button.addEventListener("click", function(){
//     if(document.body.style.background === ""){
//         document.body.style.background = "pink";
//     }
//     else{
//         document.body.style.background = "";
//     }

// });

button.addEventListener("click", function(){
    document.body.classList.toggle("pink");
})