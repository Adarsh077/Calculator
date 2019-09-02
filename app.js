const inputValues = document.querySelectorAll('.inputButton ');
const equals = document.querySelector('.equals');
const clearAll = document.querySelector('.clearAll');
const inputFeild = document.querySelector('#input')
const outputFeild = document.querySelector('#output');

let input = '';
let output = '';
const ops = ['-', '+', '/', '*'];

const evaluate = (exp, lvl = 0) => {
    exp = exp.split(ops[lvl]);
    for (let i in exp) {
        if (isExpression(exp[i])) {
            exp[i] = evaluate(exp[i], lvl + 1);
        }
    }

    for (let i in exp) {
        exp[i] = parseInt(exp[i]);
    }

    if (!exp[1]) return exp[0];
    switch (lvl) {
        case 0:
            return exp.reduce((a, b) => parseInt(a) - parseInt(b));
        case 1:
            return exp.reduce((a, b) => parseInt(a) + parseInt(b));
        case 2:
            return exp.reduce((a, b) => parseInt(a) / parseInt(b));
        case 3:
            return exp.reduce((a, b) => parseInt(a) * parseInt(b));
    }
}

const isExpression = exp => {
    for (let i of ops) {
        if (exp.includes(i)) {
            return true;
        }
    }
    return false;
}

const updateUI = (bool) => {
    inputFeild.value = input;
    outputFeild.value = bool ? '' : outputFeild.value;
}

inputValues.forEach(inputButton => {
    inputButton.addEventListener('click', ele => {
        const value = ele.target.getAttribute('data-value');
        input += !value ? ele.target.parentElement.getAttribute('data-value') : value;
        updateUI();
    })
})

clearAll.addEventListener('click', () => {
    input = '';
    output = '';
    updateUI(true);
})

equals.addEventListener('click', () => {
    outputFeild.value = evaluate(input)
});