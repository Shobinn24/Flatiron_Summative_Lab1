// History management functions

// Add calculation to history
function addToHistory(calculationObj) {
    // Add timestamp to the calculation
    calculationObj.timestamp = new Date().toLocaleString();
    
    // Add to beginning of array (most recent first)
    calculationHistory.unshift(calculationObj);
    
    // Limit history to 50 items to prevent memory issues
    if (calculationHistory.length > 50) {
        calculationHistory.pop();
    }
    
    // Update the UI
    updateHistoryDisplay();
    
    // Save to localStorage
    saveHistoryToStorage();
}

// Clear all history
function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
    saveHistoryToStorage();
}

// Update history display in the UI
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No calculations yet</p>';
        return;
    }
    
    let historyHTML = '';
    
    calculationHistory.forEach((calc, index) => {
        const hasError = calc.error !== undefined;
        const errorClass = hasError ? 'history-error' : '';
        
        // Format the calculation display
        let calculationText = '';
        if (calc.operands && calc.operands.length === 2) {
            const op1 = formatNumber(calc.operands[0]);
            const op2 = formatNumber(calc.operands[1]);
            const symbol = getOperationSymbol(calc.operation);
            calculationText = `${op1} ${symbol} ${op2}`;
        }
        
        // Format the result display
        let resultText = '';
        if (hasError) {
            resultText = calc.error;
        } else if (calc.result !== null && calc.result !== undefined) {
            resultText = formatNumber(calc.result);
        }
        
        historyHTML += `
            <div class="history-item ${errorClass}" data-index="${index}">
                <div class="history-calculation">${calculationText}</div>
                <div class="history-result">${resultText}</div>
            </div>
        `;
    });
    
    historyList.innerHTML = historyHTML;
}

// Save history to localStorage
function saveHistoryToStorage() {
    try {
        localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

// Load history from localStorage
function loadHistoryFromStorage() {
    try {
        const saved = localStorage.getItem('calculatorHistory');
        if (saved) {
            calculationHistory = JSON.parse(saved);
            updateHistoryDisplay();
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        calculationHistory = [];
    }
}

// Get history statistics
function getHistoryStats() {
    return {
        totalCalculations: calculationHistory.length,
        successfulCalculations: calculationHistory.filter(calc => !calc.error).length,
        errorCount: calculationHistory.filter(calc => calc.error).length,
        operations: {
            add: calculationHistory.filter(calc => calc.operation === 'add').length,
            subtract: calculationHistory.filter(calc => calc.operation === 'subtract').length,
            multiply: calculationHistory.filter(calc => calc.operation === 'multiply').length,
            divide: calculationHistory.filter(calc => calc.operation === 'divide').length
        }
    };
}

// Initialize history on page load
document.addEventListener('DOMContentLoaded', function() {
    loadHistoryFromStorage();
});