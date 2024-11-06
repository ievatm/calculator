const display = document.getElementById("display");
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error"; // Division by zero error handling
    }
    return a / b;
}

function percentage(a) {
    return a / 100; // Percentage operation
}

function operate(operator, num1, num2) {
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
        case "%":
            return percentage(num1); // Handle percentage
        default:
            return null;
    }
}

function updateDisplay() {
    display.textContent = firstOperand || "0"; // Default to "0" if empty
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
        firstOperand = ""; // Start fresh
        shouldResetDisplay = false;
    }
    if (firstOperand.length < 12) { // Limit display length
        firstOperand += number;
        updateDisplay();
    }
}

function setOperator(operator) {
    if (currentOperator !== null) {
        calculate(); // If an operator is set, first calculate the result
    }
    currentOperator = operator;
    secondOperand = firstOperand; // Store first operand as second operand for the next calculation
    firstOperand = ""; // Clear first operand for the next number
}

function calculate() {
    if (currentOperator === null || firstOperand === "") return; // Avoid calculation if no operator or first operand

    const result = operate(currentOperator, secondOperand, firstOperand);
    firstOperand = result.toString(); // Update first operand with the result
    currentOperator = null; // Reset the operator
    shouldResetDisplay = true; // Prepare display to reset
    updateDisplay();
}

function backspace() {
    firstOperand = firstOperand.slice(0, -1); // Remove last character
    if (firstOperand === "") {
        firstOperand = "0"; // If empty, reset to "0"
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        firstOperand = "0"; // Reset to zero if new calculation
        shouldResetDisplay = false;
    }
    if (!firstOperand.includes(".")) { // Prevent multiple decimals
        firstOperand += ".";
        updateDisplay();
    }
}

// Add event listeners for the digit buttons
document.querySelectorAll(".digit").forEach(button =>
    button.addEventListener("click", () => appendNumber(button.dataset.digit))
);

// Add event listeners for the operator buttons
document.querySelectorAll(".operator").forEach(button =>
    button.addEventListener("click", () => setOperator(button.dataset.operator))
);

// Add event listener for the "=" button
document.getElementById("equals").addEventListener("click", calculate);

// Add event listener for the "C" (clear) button
document.getElementById("clear").addEventListener("click", clearCalculator);

// Add event listener for the backspace button
document.getElementById("backspace").addEventListener("click", backspace);

// Add event listener for the decimal point button
document.getElementById("decimal").addEventListener("click", appendDecimal);

// Keyboard support for calculator functionality
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "Escape") {
        clearCalculator();
    }
    else if (key === "Enter" || key === "=") {
        calculate();
    }
    else if (["+", "-", "*", "/", "%"].includes(key)) {
        setOperator(key);
    }
    else if (key >= "0" && key <= "9") {
        appendNumber(key);
    }
    else if (key === ".") {
        appendDecimal();
    }
    else if (key === "Backspace") {
        backspace();
    }
});

updateDisplay(); // Initialize the display with "0"
