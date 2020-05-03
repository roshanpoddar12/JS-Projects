class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return;
        this.currentOperand = number.toString()+this.currentOperand.toString();
        
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const curr = parseFloat(this.currentOperand);
        const prev = parseFloat(this.previousOperand);
        if(isNaN(prev) || isNaN(curr))return;
        switch(this.operation){
            case '+':
                computation = curr+prev;
            break;
            case '-':
                computation = prev-curr;
            break;
            case '*':
                computation = prev*curr;
            break;
            case '/':
                computation = prev/curr;
            break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand='';
        this.operation=undefined;

    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButtons.addEventListener('click',() =>{
   
        calculator.compute();
        calculator.updateDisplay();
})
deleteButtons.addEventListener('click',() =>{
    calculator.delete();
    calculator.updateDisplay();
})
allClearButtons.addEventListener('click',() =>{
    calculator.clear();
    calculator.updateDisplay();
})