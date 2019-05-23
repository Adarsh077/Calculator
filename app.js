// DOM elements
const input = document.getElementById('input');
const buttons = document.querySelectorAll('td button');

buttons.forEach(button => {
	const value = button.innerHTML;
	button.addEventListener('click', () => {
		if (value === 'C') {
			input.value = input.value.slice(0, -1);
		} else if (value === 'A') {
			input.value = '';
		} else if (value !== '=') {
			input.value += value;
		} else {
				input.value = eval(input.value);
		}
	})
})

document.addEventListener('keypress', ele => {
	// console.log(ele.which)
	if (ele.which >= 42 && ele.which <= 57 && ele.which !== 44) {
		input.value += ele.key;
	} else if (ele.which === 13) {
		input.value = eval(input.value);
	} else if (ele.which === 99) {
		input.value = input.value.slice(0, -1);
	} else if (ele.which === 65) {
		input.value = '';
	}
})