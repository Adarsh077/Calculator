// DOM elements
const input = document.getElementById('input');
const buttons = document.querySelectorAll('td button');

buttons.forEach(button => {
	const value = button.innerHTML;
	button.addEventListener('click', () => {
		if (value === 'C') {
			input.value = input.value.slice(0, -1);
		} else if (value === 'E') {
			input.value = '';
		} else if (value !== '=') {
			input.value += value;
		} else {
			input.value = eval(input.value);
		}
	})
})