document.addEventListener('DOMContentLoaded', function() {
    const output = document.querySelector('.calculator__output');
    const keys = document.querySelector('.calculator__keys');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;

    keys.addEventListener('click', function(e) {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.textContent;

            // Lógica para manejar operadores
            if (key.classList.contains('calculator__key--operator')) {
                handleOperator(action);
            } 
            // Lógica para manejar números y punto decimal
            else if (!isNaN(action) || action === '.') {
                handleNumber(action);
            } 
            // Lógica para manejar la tecla "="
            else if (key.classList.contains('calculator__key--enter')) {
                handleEqual();
            } 
            // Lógica para manejar la tecla "AC" (borrar todo)
            else if (action === 'AC') {
                clearCalculator();
            }

            // Actualizar la pantalla de la calculadora
            updateDisplay();
        }
    });

    // Función para manejar operadores
    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation();
            currentInput = String(result);
            firstOperand = result;
        }

        operator = nextOperator;
        currentInput = '0';
    }

    // Función para manejar números y punto decimal
    function handleNumber(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }

    // Función para manejar la tecla "="
    function handleEqual() {
        if (operator && firstOperand !== null) {
            const inputValue = parseFloat(currentInput);
            currentInput = performCalculation();
            operator = null;
            firstOperand = null;
        }
    }

    // Función para realizar cálculos
    function performCalculation() {
        const inputValue = parseFloat(currentInput);
        const firstValue = parseFloat(firstOperand);

        switch (operator) {
            case '+':
                return firstValue + inputValue;
            case '-':
                return firstValue - inputValue;
            case '×':
                return firstValue * inputValue;
            case '÷':
                return firstValue / inputValue;
            default:
                return inputValue;
        }
    }

    // Función para borrar todo
    function clearCalculator() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
    }

    // Función para actualizar la pantalla de la calculadora
    function updateDisplay() {
        output.textContent = currentInput;
    }
});
