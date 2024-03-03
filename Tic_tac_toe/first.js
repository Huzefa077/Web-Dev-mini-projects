let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#rstBtn");
let newBtn = document.querySelector("#newBtn");

let winMsg = document.querySelector("#winMsg");

let msgContainer = document.querySelector(".msgContainer");
let turnO=true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let count=0;
let win=0;
boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        count++;
        if (turnO === true ){
            box.innerText="O";
            turnO= false;
        }
        else{
            box.innerText="X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner(); 
        
        if(count===9 && win===0){
            showDraw();
        }
    });
});



const checkWinner = () =>{
    for( let pattern of winPatterns){
        
        let pos1val = boxes[pattern[0]].innerText;    
        let pos2val = boxes[pattern[1]].innerText;    
        let pos3val = boxes[pattern[2]].innerText;    
        
        if(pos1val != "" && pos2val != "" && pos3val != "" ){
            
            if(pos1val===pos2val && pos2val===pos3val){
                win++;
                showWinner(pos1val);
                disableBoxes();
            }  
        }
    } 
}
const showWinner = (winner) =>{
    winMsg.innerText  = `Team ${winner} Wins !`;
    msgContainer.classList.remove("hide");
}

const showDraw = () =>{
    winMsg.innerText  = "Draw match !";
    msgContainer.classList.remove("hide");
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
    
}
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
    
}

const resetGame = () =>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    win=0;
    count=0;
     
}

rstBtn.addEventListener("click", resetGame);

newBtn.addEventListener("click", resetGame);
