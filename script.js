let passwordtext= document.querySelector("#password-text")
let copybutton = document.querySelector("#copybtn")
const slider = document.querySelector("#slider");
const sliderlength = document.querySelector("#length-number");
const indicator = document.querySelector("#indicator-color");
let lowercaseCheck = document.querySelector("#lowercase");
let uppercaseCheck = document.querySelector("#uppercase");
let numbersCheck = document.querySelector("#numbers");
let symbolsCheck = document.querySelector("#symbols");
let allcheckbox = document.querySelectorAll("input[type=checkbox]")
let generatebtn = document.querySelector("#generatebtn");
// -----------------------Initial values ---------------------------->
let len = 5;
let string="+-*/!@#$%^&?><;:";
let checkboxCount=0 ;
// -----------------------Event Listeners---------------------------->
slider.addEventListener("input", (e) => { 
       len = e.target.value;
       handleslider();
})
generatebtn.addEventListener("click",() =>{
    if(checkboxCount <= 0){
          return;
    }
    else{
        generatepassword();
    }
});


generatesymbols();
generatelowercase()
strengthcheck();
function handleslider(){
    slider.value = len;
    sliderlength.innerText = len;
}


// 


function setindicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "5px 5px 2px grey";
}



// --------------------------function to generate random numbers ---------------------
function randomint(min, max){
   return Math.floor(Math.random() * (max-min))+min ;
}
// Functions to generate random values......
function generatenum(){
       return randomint(0,9);
}

function generateuppercase(){
     return String.fromCharCode(randomint(65,90));
}

function generatelowercase(){
    return  String.fromCharCode(randomint(97,122)) ;
}

function generatesymbols(){
     return  string.charAt(randomint(1,17)) ;
}

//------------------- Event Listener on checkboxes-------------------> 

lowercaseCheck.addEventListener("change",strengthcheck);
uppercaseCheck.addEventListener("change",strengthcheck);
numbersCheck.addEventListener("change",strengthcheck);
symbolsCheck.addEventListener("change",strengthcheck);
// -------------------function to check strength & change light ------------------

function strengthcheck(){
    

    if(lowercaseCheck.checked && uppercaseCheck.checked && (numbersCheck.checked || symbolsCheck.checked)){
         setindicator("green");
    }
    else if ((lowercaseCheck.checked || uppercaseCheck.checked) && (numbersCheck.checked || symbolsCheck.checked) ){
           setindicator("grey");
    }
    else{
         setindicator("red");
    }
    
    checkboxhandler();
}


//  ------------------Copying to clipboard------------------------------

async function copy(){
    try{
        await navigator.clipboard.writeText(passwordtext.value);
        
    }
    catch{ 
        console.log("error in copying");
    }

    copybutton.innerText= "Copied";

    setTimeout(()=> {
        copybutton.innerText= "Copy";
          },2000);
}

// --------------------------- maintaining checkbox Count-------------->
function checkboxhandler(){
     checkboxCount = 0;
     allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)
            checkboxCount++;
     })

     if(len<checkboxCount){
        len = checkboxCount;
        handleslider();
     }
}
// -----------------Generate Password ---------------------------------

function generatepassword(){
    password= "";

    if(len<checkboxCount){
        len = checkboxCount;
        handleslider();
     }

    if(uppercaseCheck.checked){
           password += generateuppercase();
    }
    if(lowercaseCheck.checked){
          password += generatelowercase();
    }
         for(let i=0; i<(len-checkboxCount); i++){
            password += generatelowercase();
         }

    if(numbersCheck.checked){
          password += generatenum();
    } 
    if(symbolsCheck.checked){
          password += generatesymbols();
    }
     
    passwordtext.value = password;
    
}

