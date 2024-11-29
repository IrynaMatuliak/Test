// 1. Заміна контенту блоків «х» та «у» (block2 і block5)
document.getElementById('swapContentBtn').addEventListener('click', () => {
    const block2 = document.querySelector('.block2');
    const block5 = document.querySelector('.block5');
    const tempContent = block2.innerHTML;
    block2.innerHTML = block5.innerHTML;
    block5.innerHTML = tempContent;
});

// 2. Обчислення площі кола
document.getElementById('calculateAreaBtn').addEventListener('click', () => {
    const radius = prompt("Введіть радіус кола:");
    if (radius) {
        const block3 = document.querySelector('.block3');
        const area = Math.PI * Math.pow(Number(radius), 2);
        const resultParagraph = document.createElement('p');
        resultParagraph.textContent = `Площа кола з радіусом ${radius} дорівнює ${area.toFixed(2)}.`;
        block3.appendChild(resultParagraph);
    }
});

// 3. Робота з формою та cookies
document.getElementById('formCookiesBtn').addEventListener('click', () => {
    const cookieName = 'maxNumbersResult';
    const existingCookie = document.cookie.split('; ').find(row => row.startsWith(cookieName));

    if (existingCookie) {
        const userConsent = confirm('У cookies знайдено результат. Видалити дані?');
        if (userConsent) {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            location.reload();
        } else {
            alert('Дані залишаться в cookies. Для оновлення форми перезавантажте сторінку.');
        }
        return;
    }

    const block3 = document.querySelector('.block3');
    const form = document.createElement('form');
    form.innerHTML = `
        <label>Введіть 10 чисел через кому:
            <input type="text" id="numbersInput">
        </label>
        <button type="button" id="calculateMax">Обчислити</button>
    `;
    block3.appendChild(form);

    document.querySelector('#calculateMax').addEventListener('click', () => {
        const numbers = document.querySelector('#numbersInput').value.split(',').map(Number);
        const max = Math.max(...numbers);
        const countMax = numbers.filter(num => num === max).length;

        document.cookie = `${cookieName}=${countMax}; path=/;`;
        alert(`Максимальне число: ${max}, кількість: ${countMax}`);
    });
});

// 4. Зміна кольору блоку з використанням localStorage
document.getElementById('changeColorBtn').addEventListener('click', () => {
    const block2 = document.querySelector('.block2');
    const newColor = prompt('Введіть новий колір для блоку 2:');
    if (newColor) {
        block2.style.backgroundColor = newColor;
        localStorage.setItem('block2BackgroundColor', newColor);
    }
});

// Встановлення кольору блоку з localStorage при завантаженні
window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('block2BackgroundColor');
    if (savedColor) {
        document.querySelector('.block2').style.backgroundColor = savedColor;
    }
});

// 5. Редагування контенту блоків
document.getElementById('editContentBtn').addEventListener('click', () => {
    document.querySelectorAll('.block').forEach((block, index) => {
        const editLink = document.createElement('a');
        editLink.textContent = 'Редагувати';
        editLink.href = '#';
        editLink.addEventListener('click', (event) => {
            event.preventDefault();
            const textarea = document.createElement('textarea');
            const saveButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            textarea.value = block.innerHTML;
            saveButton.textContent = 'Зберегти';
            deleteButton.textContent = 'Видалити';

            block.appendChild(textarea);
            block.appendChild(saveButton);
            block.appendChild(deleteButton);

            saveButton.addEventListener('click', () => {
                block.innerHTML = textarea.value;
                localStorage.setItem(`block${index + 1}`, textarea.value);
                block.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            });

            deleteButton.addEventListener('click', () => {
                localStorage.removeItem(`block${index + 1}`);
                location.reload();
            });
        });
        block.appendChild(editLink);
    });
});
