//3√-2
//-3√-2
//43^20 (el 0 no aparece) tambien con todas las operaciones.
//"homepage_url" to manifest.
//0.002
let calculation = [];
let current_number = 0;
let decimals = 0;
const DECIMAL_PRECISION = 6;
const PI = 3.14159265;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('one').onclick = function() {updateNumber(1);};
    document.getElementById('two').onclick = function() {updateNumber(2);};
    document.getElementById('three').onclick = function() {updateNumber(3);};
    document.getElementById('four').onclick = function() {updateNumber(4);};
    document.getElementById('five').onclick = function() {updateNumber(5);};
    document.getElementById('six').onclick = function() {updateNumber(6);};
    document.getElementById('seven').onclick = function() {updateNumber(7);};
    document.getElementById('eight').onclick = function() {updateNumber(8);};
    document.getElementById('nine').onclick = function() {updateNumber(9);};

    document.getElementById('add').onclick = function() {addOperator("+");};
    document.getElementById('substract').onclick = function() {addOperator("-");};
    document.getElementById('multiply').onclick = function() {addOperator("x");};
    document.getElementById('divide').onclick = function() {addOperator("÷");};
    document.getElementById('raise').onclick = function() {addOperator("^");};
    document.getElementById('root').onclick = function() {addOperator("√");};

    document.getElementById('clear').onclick = function() {clearCalc();};
    document.getElementById('PI').onclick = function() {addPI();};
    document.getElementById('decimal').onclick = function() {updateNumber(".");};
    document.getElementById('equals').onclick = function() {calculate();};
}, false)

document.onkeydown = function(e) {
    if (e.key == "Backspace") {
        clearCalc();
    } else if (e.key == "=" || e.key == "Enter") {
        calculate();
    } else if (e.key == "+" || e.key == "-" || e.key == "x" || e.key == "÷" || e.key == "^" || e.key == "√") {
        addOperator(e.key);
    } else if (e.key == "*") {
        addOperator("x");
    } else if (e.key == "/") {
        addOperator("÷");
    } else if (!isNaN(e.key)) {
        updateNumber(Number(e.key));
    }
}

function updateNumber(value) {
    if (current_number == 0 && !isNaN(calculation[calculation.length - 1]) && calculation[calculation.length - 2] != "√") {
        calculation.push("x");
    }

    if (value == '.' && decimals == 0) {
        decimals++;
    } else if (decimals == 0) {
        current_number = current_number * 10 + value;
    } else if (decimals > 0 && value != '.') {
        value = value*10**-decimals;
        current_number += value;
        current_number = Math.round(current_number * Math.pow(10, decimals)) / Math.pow(10, decimals);
        decimals++;
    }
    reloadTemp();
}

function addOperator(operator) {
    if (calculation.length == 0 && current_number == 0 && operator != "-") return;
    if (isNaN(calculation[calculation.length - 1]) && current_number == 0 && operator != "-") {
        calculation.pop();
        calculation.push(operator);
    } else if (operator == "√") {
        if (current_number != 0) {
            /*
            if (calculation[calculation.length - 1] == "-") {
                calculation.splice(calculation.length - 1, 0, "√");
                calculation.push(current_number);
                current_number = 0;
                decimals = 0;
                reloadTemp();
                return;
            }
            */
            calculation.push(operator);
            clearCurrentNumber();
        } else {
            calculation.splice(calculation.length - 1, 0, "√");
            decimals = 0;
        }
    } else if (operator == "-" && calculation[calculation.length - 2] == "√") {
        calculation.splice(calculation.length - 2, 0, operator);
    } else {
        clearCurrentNumber();
        calculation.push(operator);
    }
    reloadTemp();
}

function addPI() {
    clearCurrentNumber();
    if (calculation[calculation.length - 2] == "√") {
        calculation.splice(calculation.length - 2, 0, PI);
    } else {
        if (!isNaN(calculation[calculation.length - 1])) {
            calculation.push("x");
        }
        calculation.push(PI);
    }
    reloadTemp();
}

function calculate() {
    clearCurrentNumber();
    calculation.push("=");
    reloadTemp();
    calculation.pop();

    if (calculation.length == 0) {
        reloadDisplay();
        return;
    }

    for (i = 0; i < calculation.length; i++) {
        if (calculation[i] == '-' && typeof(calculation[i - 1]) != "number") {
            calculation[i + 1] *= -1;
            calculation.splice(i, 1);
        }
    }
    if (checkIfOver()) return;

    for (i = 0; i < calculation.length; i++) {
        if (calculation[i] == '^') {
            calculation[i] = Math.pow(calculation[i - 1], calculation[i + 1]);
            spliceCalculation(i);
            i--;
        } else if (calculation[i] == '√') {
            calculation[i] = Math.pow(calculation[i + 1], 1/calculation[i - 1]);
            spliceCalculation(i);
            i--;
        }
    }
    if (checkIfOver()) return;

    for (i = 0; i < calculation.length; i++) {
        if (calculation[i] == 'x') {
            calculation[i] = calculation[i - 1] * calculation[i + 1];
            spliceCalculation(i);
            i--;
        } else if (calculation[i] == '÷') {
            calculation[i] = calculation[i - 1] / calculation[i + 1];
            spliceCalculation(i);
            i--;
        }
    }
    if (checkIfOver()) return;

    for (i = 0; i < calculation.length; i++) {
        if (calculation[i] == '+') {
            calculation[i] = calculation[i - 1] + calculation[i + 1];
            spliceCalculation(i);
            i--;
        } else if (calculation[i] == '-') {
            calculation[i] = calculation[i - 1] - calculation[i + 1];
            spliceCalculation(i);
            i--;
        }
    }
    reloadDisplay();
}

function spliceCalculation(i) {
    calculation.splice(i - 1, 1);
    calculation.splice(i, 1);
}

function checkIfOver() {
    if (calculation.length == 1) {
        reloadDisplay();
        return true;
    }
}

function reloadDisplay() {
    if (isNaN(calculation[0]) || calculation.length > 1) {
        document.getElementById("display").innerHTML = "Error";
        document.getElementById("display").style.setProperty("font-size", `30px`);
    } else {
        let result = Math.round(calculation[0] * Math.pow(10, DECIMAL_PRECISION)) / Math.pow(10, DECIMAL_PRECISION);
        let size = result.toString().length;
        if (size >= 12) {
            size = 51 - 2 * size;
            if (size < 14) {
                size = 14;
            }
            size += "px";
        } else {
            size = "30px";
        }
        document.getElementById("display").innerHTML = result;
        document.getElementById("display").style.setProperty("font-size", size);
    }
}

function clearCurrentNumber() {
    if (current_number != 0 && calculation[calculation.length - 2] == "√") {
        calculation.splice(calculation.length - 2, 0, current_number);
    } else if (current_number != 0) {
        calculation.push(current_number);
    }
    current_number = 0;
    decimals = 0;
}

function clearCalc() {
    calculation = [];
    current_number = 0;
    decimals = 0;
    reloadTemp();
    document.getElementById("display").innerHTML = "";
}

function reloadTemp() { 
    if (current_number != 0 && calculation[calculation.length - 2] == "√") {
        let temp = [].concat(calculation);
        temp.splice(calculation.length - 2, 0, current_number);
        let result = temp.join(" ");
        document.getElementById("temp").innerHTML = result;
    } else {
        let result = calculation.join(" ");
        if (current_number != 0) {
            result += " " + current_number;
        }
        document.getElementById("temp").innerHTML = result;
    }
}