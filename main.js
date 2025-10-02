// main.js

import { getUsers } from './api.js';
import { filterByCity, sortByName } from './utils.js';

// Константа для фільтрації (згідно з прикладом у завданні)
const TARGET_CITY = 'Gwenborough';
const resultsDiv = document.getElementById('results');

/**
 * Відображає відсортований список користувачів в HTML.
 * @param {Array<Object>} users - Список користувачів.
 */
function renderUsersToHtml(users) {
    if (users.length === 0) {
        resultsDiv.innerHTML = `<p>Користувачів у місті "${TARGET_CITY}" не знайдено.</p>`;
        return;
    }

    // Створення списку <ul> (Завдання 4)
    const ul = document.createElement('ul');
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${user.name}</strong> (${user.username}) - Email: ${user.email}`;
        ul.appendChild(li);
    });

    resultsDiv.innerHTML = ''; // Очищаємо "Завантаження..."
    resultsDiv.appendChild(ul);
}

/**
 * Відображає повідомлення про помилку в HTML (Завдання 5).
 * @param {string} message - Текст помилки.
 */
function displayError(message) {
    resultsDiv.innerHTML = `<p class="error">Помилка: ${message}</p>`;
}

/**
 * Головна функція додатку.
 */
async function initializeApp() {
    console.log('--- Початок виконання додатку ---');
    try {
        // 1. Завантаження даних
        const users = await getUsers();
        console.log('1. Дані успішно завантажені.', users);

        // 2. Фільтрація
        const filtered = filterByCity(users, TARGET_CITY);
        console.log(`2. Користувачі, відфільтровані по місту "${TARGET_CITY}":`, filtered);

        // 3. Сортування
        const finalUsers = sortByName(filtered);
        console.log('3. Відсортований список:', finalUsers);

        // 4. Виведення результату
        renderUsersToHtml(finalUsers);

    } catch (error) {
        // 5. Обробка помилок (Мережеві або JSON)
        console.error("Критична помилка виконання:", error.message);
        displayError(error.message);
    }
    console.log('--- Кінець виконання додатку ---');
}

// Запуск додатку
initializeApp();