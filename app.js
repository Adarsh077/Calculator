// DOM elements
const input = document.getElementById("input");
const buttons = document.querySelectorAll("td button");

// Global Variables
let newNum = "";
let oldNum = "";
let opt = "";
let clear = false;
let display = "";
let result;

const calculator = {
  displayNum: num => {
    if (clear) {
      newNum = num;
      clear = false;
      input.value = newNum;
    } else {
      newNum += num;
      input.value += num;
    }
  },
  deleteOne: () => {
    const check = input.value.split("").splice(-1, 1);
    if (
      check == "+" ||
      check == "-" ||
      check == "*" ||
      check == "/" ||
      check == "%"
    ) {
      opt = "";
      newNum = oldNum;
      oldNum = "";
    } else {
      newNum = newNum.slice(0, -1);
    }
    input.value = input.value.slice(0, -1);
  },
  clearAll: () => {
    newNum = "";
    oldNum = "";
    input.value = "";
    result = "";
    display = "";
  },
  equals: (oldN, newN, ops) => {
    result = calculator.calculate(oldN, newN, ops);
    result = calculator.validate(result);
    if (result === "Invalid Expression!") clear = true;
    newNum = result;
    oldNum = "";
    input.value = newNum;
  },
  displayOpt: ops => {
    if (oldNum !== "") calculator.equals(oldNum, newNum, opt);
    opt = ops;
    oldNum = newNum;
    newNum = "";
    input.value += opt;
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
  validate: num => {
    if (num === Infinity || isNaN(num)) {
      ("Invalid Expression!");
    } else {
			if(num.toString(10).includes('.')){
				return num.toFixed(2).toString(10);
			}
			return num.toString(10)
		}
  }
};

buttons.forEach(button => {
  const value = button.innerHTML;
  if ((value > -1 && value < 10) || value === ".")
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
        button.addEventListener("click", () =>
          calculator.equals(oldNum, newNum, opt)
        );
        break;
      default:
        button.addEventListener("click", () => calculator.displayOpt(value));
    }
  }
});

document.body.addEventListener("keypress", ele => {
  if ((ele.key > -1 && ele.key < 10) || ele.keyCode === 46) {
    calculator.displayNum(ele.key);
  } else if (ele.key === "C" || ele.key === "c") calculator.deleteOne();
  else if (ele.key === "A" || ele.key === "a") calculator.clearAll();
  else if (ele.keyCode === 13) calculator.equals(oldNum, newNum, opt);
  else if (ele.key) calculator.displayOpt(ele.key);
});
