// let string = "";
// let buttons = document.querySelectorAll('.button');
// Array.from

document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.c-input');
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.innerText));
    });

    function handleButtonClick(value) {
        switch (value) {
            case 'AC':
                input.value = '';
                break;
            case 'C':
                input.value = input.value.slice(0, -1);
                break;
            case '=':
                try {
                    input.value = eval(input.value);
                } catch {
                    input.value = 'Error';
                }
                break;
            default:
                input.value += value;
                break;
        }
    }
});