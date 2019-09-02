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
evaluate('1-2+75/3*5');