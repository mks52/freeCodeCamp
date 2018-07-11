

function init() {
    var chain="";
    var str="";
    var sum=0;
    var operatorBoolean = false;
    var decimalBoolean = true;
    var currentOperator = "";
    var firstOperand=0;
    var operatorCount=0;
    var opStr = {
        "Add":"+",
        "Multiply":"*",
        "Divide":"/",
        "Subtract":"-",
    }
    document.getElementById("div").addEventListener("click", displayDate,false);
    var text= document.getElementById("txt1");
    function displayDate(val) {
        if (val.target.id.substring(0,3)=="num" && !isNaN(val.target.id.substring(3))){
            str=str.concat(val.target.id.substring(3));
            console.log("str: "+str);
            operand(val.target.id.substring(3));
            
        }
        else if(val.target.id==="dot") {
            str=str.concat(val.target.id);
            console.log("str: "+str);
            operand(".")
        }
        else if(val.target.id==="clear") {
            currentOperator = "";
            firstOperand=0;
            chain="";
            text.innerHTML="0";
            str="";
            console.log("str: "+str);
        }
        else if(val.target.id==="butEqual") {
            operator(val.target.id);
            currentOperator = "";
            //firstOperand=0;
            chain="";
            str="";
            console.log("str: "+str);
        }
        else if(!isNaN(str.charAt(str.length-1)) && str.length>0) {
            str=str.concat(opStr[val.target.id.substring(3)]);
            console.log("str: "+str);
            operator(val.target.id);
        }
        
        
    }
    function operand(operand) {
        chain=chain.concat(operand);
        console.log("Operand: "+chain);
        text.innerHTML=chain;
    }
    function operator(operator) {
        if(currentOperator!==""){
            operate(firstOperand,currentOperator,chain);
            text.innerHTML=Math.round(firstOperand * 100) / 100
        }
        firstOperand=parseFloat(chain);
        chain='';

       
        console.log("result"+firstOperand);
        currentOperator=operator;
    }
    function operate(f,op,s) {
        
        switch(op){
            case 'butAdd':
                firstOperand=parseFloat(f)+parseFloat(s);
                break;
            case 'butSubtract':
                firstOperand=parseFloat(f)-parseFloat(s);
                break;
            case 'butMultiply':
                firstOperand=parseFloat(f)*parseFloat(s);
                break;
            case 'butDivide':
                firstOperand=parseFloat(f)/parseFloat(s);
                break; 
            case 'butEqual':
                break;   
        }
        chain=firstOperand;
    }
    
}
init();