JavaScript Calculator with History Tracking

A functional calculator application built with vanilla JavaScript featuring calculation history, error handling, and a clean modular architecture. Demonstrates core programming concepts including input validation, state management, and functional programming patterns.

Features

Basic Arithmetic Operations - Addition, subtraction, multiplication, and division
Calculation History - Stores and displays previous calculations
Error Handling - Robust validation for edge cases (division by zero, invalid inputs)
Structured Data Returns - Each operation returns detailed result objects
Clean Architecture - Modular functions following single responsibility principle
Persistent State - History tracking across multiple calculations
User-Friendly Interface - Intuitive calculator layout with clear feedback

Technologies Used

HTML5 - Semantic markup structure
CSS3 - Responsive styling and layout
Vanilla JavaScript (ES6+) - Core functionality without dependencies
Functional Programming - Pure functions with predictable outputs
Object-Oriented Data - Structured return objects for each operation

Installation

Prerequisites
A modern web browser (Chrome, Firefox, Safari, Edge)
No additional dependencies required!

Setup
Clone the repository: git clone https://github.com/Shobinn24/Flatiron_Summative_Lab1.git
Navigate to the project directory: cd Flatiron_Summative_Lab1
Open index.html in your browser: # On Mac
open index.html

# On Windows
start index.html

# Or simply double-click index.html

Usage
Performing Calculations

Enter your first number
Select an operation (+, -, ×, ÷)
Enter your second number
View the result instantly
Access calculation history to review previous operations

Example Calculations
// Addition
add(5, 3)
// Returns: { operation: 'add', operands: [5, 3], result: 8 }

// Division with error handling
divide(10, 0)
// Returns: { operation: 'divide', operands: [10, 0], result: null, error: 'Division by zero is not allowed' }

Architecture & Implementation
Core Functions
Each arithmetic operation is implemented as a pure function that returns a structured object:
function add(a, b) {
    const result = a + b;
    return {
        operation: 'add',
        operands: [a, b],
        result: result  
    };
}
Key Technical Features

Error Validation

Division by zero prevention
Input type checking
Invalid operation handling


History Management

Array-based storage (calculationHistory[])
Operation tracking with full context
Result retrieval for review


Data Structure

Consistent return objects across all operations
Includes operation type, operands, and result
Error property for failed operations


Modular Design

Separate function for each operation
Single responsibility principle
Easy to test and maintain

Project Structure

Flatiron_Summative_Lab1/
├── index.html           # Main HTML structure
├── style.css            # Styling and layout
├── calculator.js        # Core calculator logic
├── history.js           # History management
├── ui.js                # User interface handlers
└── README.md

Key Learning Outcomes
Through this project, I developed skills in:

Error Handling - Implementing defensive programming practices
State Management - Tracking application state with arrays
Functional Programming - Writing pure, predictable functions
Data Structures - Designing consistent object returns
Input Validation - Preventing edge cases and errors
Modular Code - Creating maintainable, reusable components
DOM Manipulation - Updating UI based on calculation results

Edge Cases Handled
Division by Zero - Returns error object instead of crashing
 Invalid Inputs - Type checking and validation
 Decimal Precision - Proper floating-point handling
 Negative Numbers - Correct arithmetic with negative operands
 Large Numbers - Handling calculations beyond standard range
 History Overflow - Managing memory with large calculation 
 
 Future Enhancements

 Scientific calculator functions (sin, cos, tan, log)
 Keyboard input support
 Memory functions (M+, M-, MR, MC)
 Export history to CSV/JSON
 Undo/Redo functionality
 Theme customization (dark mode, color schemes)
 Calculation chaining (use previous result as next input)
 Unit testing with Jest
 Local storage persistence for history

Design Highlights

Clean, intuitive interface
Responsive layout for mobile and desktop
Clear visual feedback for operations
Accessible color scheme
History panel for reviewing calculations

Author
Shobinn Clark

GitHub: @Shobinn24
LinkedIn: https://www.linkedin.com/in/shobinn-clark-27722a85/

Acknowledgments

Flatiron School Full-Stack Software Engineering Program
MDN Web Docs for JavaScript reference
Community feedback and code reviews

If you found this project helpful, please give it a star!
Code Quality Notes
This calculator demonstrates several best practices:

Separation of Concerns - Logic, UI, and data management in separate modules
Defensive Programming - Error handling for all edge cases
Consistent API - All operations return the same object structure
Readability - Clear function names and comprehensive comments
Maintainability - Easy to extend with new operations or features