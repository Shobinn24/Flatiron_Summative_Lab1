// Array to store calculator history
let calculationHistory = [];

// Basic calculator functions

// Function to add two numbers
function add(a, b) {
    const result = a + b;
    return {
        operation: 'add',
        operands: [a, b],
        result: result  
    };
}

// Function to subtract two numbers
function subtract(a, b) {
    const result = a - b;
    return {
        operation: 'subtract',
        operands: [a, b],
        result: result  
    };   
}

// Function to multiply two numbers
function multiply(a, b) {
    const result = a * b;
    return {
        operation: 'multiply',
        operands: [a, b],
        result: result  
    };   
}

// Function to divide two numbers
function divide(a, b) {
    if (b === 0) {
        return {
            operation: 'divide',
            operands: [a, b],
            result: null,
            error: 'Division by zero is not allowed'      
        };   
    }
    const result = a / b;
    return {
        operation: 'divide',
        operands: [a, b],
        result: result  
    };   
}