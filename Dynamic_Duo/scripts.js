const newBox = document.querySelector(".linkBox");
const overLay = document.querySelector(".overlay")

// shareBn.addEventListener('click',function(){
//     shareBn.classList.add("show");
//     overlay.classList.add('overlayactive');
// });
function openSharebox(){
    newBox.classList.add("show");
    overLay.classList.add("overlayactive");
};
function closeSharebox(){
    newBox.classList.remove("show");
    overLay.classList.remove("overlayactive");
};
