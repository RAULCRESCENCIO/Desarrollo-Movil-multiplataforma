       
        let screen = document.getElementById('screen');
        let currentInput = '0';
        let currentOperator = null;
        let prevValue = null;

        function appendToScreen(value) {
            if (currentInput === '0' || currentInput === '-0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateScreen();
        }

        function appendOperator(operator) {
            currentOperator = operator;
            prevValue = parseFloat(currentInput);
            currentInput = '0';
            updateScreen();
        }

        function calculateUnary(operation) {
            const input = parseFloat(currentInput);
            switch (operation) {
                case 'inverso':
                    currentInput = inverso(input);
                    break;
                case 'cuadrado':
                    currentInput = cuadrado(input);
                    break;
                case 'raizCuadrada':
                    currentInput = raizCuadrada(input);
                    break;
                    case 'residuo':
                    // Llama a la función de residuo con el valor previo y el valor actual
                    if (prevValue !== null) {
                        currentInput = residuo(prevValue, input);
                    }
                    break;
                default:
                    break;
            }
            updateScreen();
        }

        function toggleSign() {
            if (currentInput !== '0') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateScreen();
            }
        }

        function calculateResult() {
            if (currentOperator && prevValue !== null) {
                const currentValue = parseFloat(currentInput);
                switch (currentOperator) {
                    case '+':
                        currentInput = suma(prevValue , currentValue);
                        break;
                    case '-':
                        currentInput = resta(prevValue,currentValue);
                        break;
                    case '*':
                        currentInput = multiplicacion(prevValue,currentValue);
                        break;
                    case '/':
                        if (currentValue !== 0) {
                            currentInput = division(prevValue , currentValue);
                        } else {
                            currentInput = 'Error';
                        }
                        break;
                    default:
                        break;
                }
                currentOperator = null;
                prevValue = null;
                updateScreen();
            }
        }

        function limpiar() {
            currentInput = '0';
            currentOperator = null;
            prevValue = null;
            updateScreen();
        }

        function updateScreen() {
            screen.textContent = currentInput;
        }

        function calculate(event) {
            if (event.target.tagName === 'BUTTON') {
                const buttonText = event.target.textContent;
                switch (buttonText) {
                    case 'C':
                        limpiar();
                        break;
                    case '=':
                        calculateResult();
                        break;
                    case '⌫':
                        currentInput = currentInput.slice(0, -1);
                        if (currentInput === '') {
                            currentInput = '0';
                        }
                        updateScreen();
                        break;
                    default:
                        break;
                }
            }
        }

        // Función de suma
const suma = (a, b) => a + b;

// Función de resta
const resta = (a, b) => a - b;

// Función de multiplicación
const multiplicacion = (a, b) => a * b;

// Función de división
const division = (a, b) => a / b;

// Función de x al cuadrado
const cuadrado = x => x ** 2;

// Función de raíz cuadrada de x
const raizCuadrada = x => Math.sqrt(x);

// Función de 1/x
const inverso = x => 1 / x;

// Función de residuo
const residuo = (a, b) => a % b;