// UI interaction functions

// Current calculation state (needs to be accessible to other functions)
let currentOperand = '';
let previousOperand = '';
let operation = null;

// Append number to current operand
function appendNumber(number) {
    // Prevent multiple decimal points
    if (number === '.' && currentOperand.includes('.')) {
        return;
    }
    
    // Limit length to prevent overflow
    if (currentOperand.length >= 15) {
        return;
    }
    
    currentOperand += number;
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (currentOperand === '') {
        // If there's a previous result, use it
        if (previousOperand !== '') {
            operation = op;
            updateDisplay();
        }
        return;
    }
    
    // If there's already an operation pending, calculate it first
    if (operation !== null && previousOperand !== '') {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Perform calculation
function calculate() {
    if (operation === null || previousOperand === '' || currentOperand === '') {
        return;
    }
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // Validate inputs
    if (isNaN(prev) || isNaN(current)) {
        displayError('Invalid input');
        return;
    }
    
    // Execute the calculation
    const result = executeCalculation(operation, prev, current);
    
    // Add to history
    addToHistory(result);
    
    // Handle errors
    if (result.error) {
        displayError(result.error);
        resetCalculator();
        return;
    }
    
    // Update display with result
    const roundedResult = roundResult(result.result);
    currentOperand = roundedResult.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

// Clear current entry (C button)
function clearDisplay() {
    currentOperand = '';
    updateDisplay();
}

// Clear all (AC button)
function clearAll() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// Reset calculator state
function resetCalculator() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// Update the calculator display
function updateDisplay() {
    const calculationDisplay = document.getElementById('calculationDisplay');
    const resultDisplay = document.getElementById('resultDisplay');
    
    // Build calculation string
    let calculationString = '';
    if (previousOperand !== '') {
        calculationString = previousOperand;
        if (operation !== null) {
            calculationString += ' ' + getOperationSymbol(operation);
        }
        if (currentOperand !== '') {
            calculationString += ' ' + currentOperand;
        }
    }
    
    // Update displays
    calculationDisplay.textContent = calculationString || '0';
    resultDisplay.textContent = currentOperand || previousOperand || '0';
}

// Display error message
function displayError(message) {
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.textContent = message;
    
    // Clear error after 2 seconds
    setTimeout(() => {
        updateDisplay();
    }, 2000);
}

// Initialize all event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize display
    updateDisplay();

    // Add click listeners to number buttons
    document.querySelectorAll('.btn.number').forEach(button => {
        button.addEventListener('click', function() {
            appendNumber(this.dataset.num);
        });
    });

    // Add click listeners to operator buttons
    document.querySelectorAll('.btn.operator').forEach(button => {
        button.addEventListener('click', function() {
            appendOperator(this.dataset.op);
        });
    });

    // Add click listener to equals button
    document.getElementById('btnEquals').addEventListener('click', calculate);

    // Add click listeners to clear buttons
    document.getElementById('btnC').addEventListener('click', clearDisplay);
    document.getElementById('btnAC').addEventListener('click', clearAll);

    // Add click listener to clear history button
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        // Numbers
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        }
        
        // Decimal point
        if (key === '.') {
            appendNumber('.');
        }
        
        // Operators
        if (key === '+' || key === '-' || key === '*' || key === '/') {
            appendOperator(key);
        }
        
        // Enter or equals
        if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculate();
        }
        
        // Backspace
        if (key === 'Backspace') {
            event.preventDefault();
            currentOperand = currentOperand.slice(0, -1);
            updateDisplay();
        }
        
        // Escape or C for clear
        if (key === 'Escape' || key === 'c' || key === 'C') {
            clearAll();
        }
    });
});