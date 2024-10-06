const pwdDisplay =document.querySelector("#disp_pwd");
const copyBtn = document.querySelector("[copy-button]");
const copyMsg = document.querySelector("[data-copyMsg]");
const dispLength = document.querySelector("[data-length]");
const inputSlider = document.querySelector("#slider");
const symbols = "!@#$%^&*()_+<>~";

const lowercaseCheck = document.querySelector("#lowercase");
const uppercaseCheck = document.querySelector("#uppercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const strengthIndicator = document.querySelector("#circle");
const generateBtn = document.querySelector("[generate-button]");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const level = document.querySelector(".level");
const weak = document.querySelector("#weak");
const moderate = document.querySelector("#moderate");
const strong = document.querySelector("#strong");
const unique = document.querySelector("#unique");

let pwdLength = 10;
let password ="";
let checkCount = 0;
handleSlider();
//default circle color = grey
// calcStrength();

function handleSlider(){
    inputSlider.value = pwdLength;
    dispLength.innerText = pwdLength;
}

function setIndicator(color){
    strengthIndicator.style.backgroundColor = color;
    strengthIndicator.style.boxShadow = `0px 0px 10px ${color}`;

    //shadow homework
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRndNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode( getRndInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode( getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = generateRndNumber(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false; //unchecked
    let hasLower = false; //unchecked
    let hasNum = false; //unchecked
    let hasSym = false; //unchecked

    if(lowercaseCheck.checked) hasLower = true;
    if(uppercaseCheck.checked) hasUpper = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    const strength = hasUpper + hasLower + hasNum + hasSym;

    if(strength == 0){
        setIndicator("white");
    }

    if(strength === 1 ){
        setIndicator("green");
        // levDisp("weak");
        
    }
    
    if (strength === 2){
        setIndicator("orange");
        // levDisp("moderate");
    }
    if (strength === 3){
        setIndicator("red");
        // levDisp("strong");
    }
    
    if(strength === 4){
        setIndicator("darkred");
        // levDisp("unique");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(pwdDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    //making copied span visible
    copyMsg.classList.add("active"); //active class to be created ahead in css
    setTimeout( ()=>{ copyMsg.classList.remove("active");
    }, 1000 );

}

function shufflePwd(array){
    //fisher yates method
    for(let i = array.length -1;i>0;i--){
    //finding j in array range and swapping its index postion with i index position elelment.
        const j = Math.floor(Math.random()* (i+1));
        const temp =array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el)=>(str += el));
    return str;
}



function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(pwdLength<checkCount){
        pwdLength = checkCount;
        handleSlider();
    }
     //calculate strength
     calcStrength();
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{
    pwdLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=> {
    if(pwdDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click',()=>{
    //none of the boxes are checked 
    if(checkCount ==0){
        return;
    }
    if(pwdLength < checkCount){
        pwdLength = checkCount;
        handleSlider();
    }

    //let's start the journey to find new password
    //remove old password
    console.log("starting the journey");
    password = ""; 

    //lets puth the stuff mentioned by characters

    // if(uppercaseCheck.checked){
    //     password += generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRndNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];
    if (uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if (lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if (numbersCheck.checked){
        funcArr.push(generateRndNumber);
    }
    if (symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory addition

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }
    console.log("compulsory addition done");

    //remining addition
    for(let i=0;i<pwdLength-funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);
        console.log("randIndex" + randIndex)
        password += funcArr[randIndex]();
    }
    console.log("remaining addtition done");

    //shuffling password
    password = shufflePwd(Array.from(password));

    console.log("shuffling done");


    //show in UI
    pwdDisplay.value = password;
    console.log("ui addition done");


   



})

