// DOM elements
const input = document.getElementById("input");
const buttons = document.querySelectorAll("td button");

// Global Variables
let newNum = "";
let oldNum = "";
let opt = '';
let clear = false;
let result;

const calculator = {
  displayNum: num => {
    if (clear) {
      newNum = num;
      clear = false;
    } else {
      newNum += num;
    }
    input.value = newNum;
  },
  deleteOne: () => {
    newNum = newNum.slice(0, -1);
    input.value = newNum;
  },
  clearAll: () => {
    newNum = "";
    oldNum = "";
    input.value = "";
    result = "";
  },
  equals: (oldN, newN, ops) => {
    result = calculator.calculate(oldN, newN, ops);
    result = calculator.validate(result);
    clear = true;
    input.value = result;
    newNum = result;
  },
  displayOpt: ops => {
		opt = ops;
    oldNum = newNum;
    newNum = "";
    input.value = opt;
  },
  calculate: (num1, num2, ops) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (ops) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "/":
        return num1 / num2;
      case "%":
        return num1 % num2;
      case "*":
        return num1 * num2;
    }
  },
  validate: num =>
    num === Infinity || isNaN(num) ? "Invalid Expression!" : num
};

buttons.forEach(button => {
  const value = button.innerHTML;
  if (value > -1 && value < 10)
    button.addEventListener("click", () => calculator.displayNum(value));
  else {
    switch (value) {
      case "C":
        button.addEventListener("click", () => calculator.deleteOne());
        break;
      case "A":
        button.addEventListener("click", () => calculator.clearAll());
        break;
      case "=":
        button.addEventListener("click", () => calculator.equals(oldNum, newNum, opt));
        break;
      default:
        button.addEventListener("click", () => calculator.displayOpt(value));
    }
  }
});
