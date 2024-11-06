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

function updateDisplay() {
    display.textContent = firstOperand || "0";
}

function clearCalculator() {
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        firstOperand ="";
        shouldResetDisplay = false;
    }
    if (firstOperand.length <12) {
        firstOperand += number;
        updateDisplay();
    }
}

function setOperator(operator) {
    if(currentOperator !== null) calculate();
    currentOperator = operator;
    secondOperand =firstOperand;
    firstOperand = "";
}

function calculate() {
    if (currentOperator === null || firstOperand === "") return;
        const result = operate(currentOperator, secondOperand, firstOperand);
        firstOperand =result.toString();
        currentOperator = null;
        shouldResetDisplay = true;
        updateDisplay();
}

function backspace() {
    firstOperand = firstOperand.slice(0, -1);
    updateDisplay();
}

function appendDecimal() {
    if(shouldResetDisplay) {
        firstOperand ="0";
        shouldResetDisplay = false;
    }
    if(!firstOperand.includes(".")) {
        firstOperand += ".";
        updateDisplay();
    }
}

document.querySelectorAll(".digit").forEach(button =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

document.querySelectorAll(".operator").forEach(button =>
    button.addEventListener("click", () => setOperator(button.textContent))
);

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearCalculator);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("decimal").addEventListener("click", appendDecimal);

document.addEventListener("keydown", (event) => {
    const key =event.key;

    if (key === "Escape") {
        clearCalculator();
    }
    else if (key === "Enter" || key === "=") {
        calculate();
    }
    else if (["+", "-", "*", "/"].includes(key)) {
        setOperator(key);
    }
    else if (key >= "0" && key <= "9") {
        appendNumber(key);
    }
    else if (key === ".") {
        appendDecimal();
    }
    else if (key === "backspace") {
        backspace();
    }
});

updateDisplay();