const display = document.getElementById("display");
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply (a, b) {
    return a*b;
}

function divide (a, b) {
 if(b===0) {
    return "Error;"
 }
 return a/b;
}

function operate (operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}