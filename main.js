// main.js - Головний модуль додатку
// Опис: Цей модуль ініціалізує додаток, завантажує дані, обробляє взаємодію користувача
// з фільтрацією та сортуванням, а також відображає результати в HTML.

import { getUsers } from './api.js'; // Імпортуємо функцію для завантаження користувачів
import { filterByCity, sortUsers } from './utils.js'; // Імпортуємо функції для фільтрації та сортування

// --- Змінні стану додатку ---
let allUsers = [];           // Зберігає всі завантажені дані користувачів
let currentFilteredUsers = []; // Зберігає користувачів після застосування фільтрації
let currentSortField = 'name'; // Поле, за яким наразі відсортовано
let currentSortOrder = 'asc';  // Порядок сортування ('asc' або 'desc')
let currentFilterCity = '';    // Місто, за яким наразі застосовано фільтр

// --- Посилання на DOM-елементи ---
const resultsDiv = document.getElementById('results');
const cityFilterInput = document.getElementById('cityFilter');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const resetFilterBtn = document.getElementById('resetFilterBtn');

const sortByNameAscBtn = document.getElementById('sortByNameAscBtn');
const sortByNameDescBtn = document.getElementById('sortByNameDescBtn');
const sortByUsernameAscBtn = document.getElementById('sortByUsernameAscBtn');
const sortByUsernameDescBtn = document.getElementById('sortByUsernameDescBtn');

// --- Функції для рендерингу та відображення повідомлень ---

/**
 * Відображає відфільтрований та відсортований список користувачів в HTML.
 * @param {Array<Object>} users - Масив об'єктів користувачів для відображення.
 */
function renderUsersToHtml(users) {
    resultsDiv.innerHTML = ''; // Очищаємо попередній вміст

    if (users.length === 0) {
        // Якщо список порожній, виводимо відповідне повідомлення
        resultsDiv.innerHTML = `<p>Користувачів не знайдено за поточними критеріями фільтрації/сортування.</p>`;
        return;
    }

    const ul = document.createElement('ul'); // Створюємо невпорядкований список <ul>
    
    users.forEach(user => {
        const li = document.createElement('li'); // Для кожного користувача створюємо елемент списку <li>
        li.innerHTML = `
            <strong>${user.name}</strong> <span>(${user.username})</span><br>
            <span>Email: ${user.email}</span><br>
            <span>Місто: ${user.address.city}</span>
        `;
        ul.appendChild(li); // Додаємо елемент списку до <ul>
    });

    resultsDiv.appendChild(ul); // Додаємо <ul> до основного блоку результатів
}

/**
 * Відображає повідомлення про помилку в HTML.
 * @param {string} message - Текст помилки для відображення.
 */
function displayError(message) {
    resultsDiv.innerHTML = `<p class="error">Помилка: ${message}</p>`;
}

// --- Функції для обробки логіки фільтрації та сортування ---

/**
 * Застосовує поточні фільтри та сортування до завантажених даних
 * і оновлює відображення в HTML.
 */
function applyFiltersAndSort() {
    let usersToRender = [...allUsers]; // Починаємо з копії всіх завантажених користувачів

    // 1. Застосовуємо фільтрацію за містом, якщо вона встановлена
    if (currentFilterCity) {
        usersToRender = filterByCity(usersToRender, currentFilterCity);
    }
    
    currentFilteredUsers = usersToRender; // Зберігаємо результат фільтрації для подальшого сортування

    // 2. Застосовуємо сортування
    const finalUsers = sortUsers(currentFilteredUsers, currentSortField, currentSortOrder);

    // 3. Відображаємо кінцевий список
    renderUsersToHtml(finalUsers);
    console.log(`Відображено: ${finalUsers.length} користувачів. Фільтр: "${currentFilterCity}", Сортування: ${currentSortField} ${currentSortOrder}`);
}

// --- Обробники подій для елементів управління ---

// Обробник для кнопки "Застосувати фільтр"
applyFilterBtn.addEventListener('click', () => {
    currentFilterCity = cityFilterInput.value.trim(); // Отримуємо значення з поля вводу
    applyFiltersAndSort(); // Застосовуємо фільтри та сортування
});

// Обробник для кнопки "Скинути фільтр"
resetFilterBtn.addEventListener('click', () => {
    cityFilterInput.value = ''; // Очищаємо поле вводу
    currentFilterCity = '';    // Скидаємо значення фільтра
    applyFiltersAndSort();     // Застосовуємо фільтри та сортування (по суті, тільки сортування)
});

// Обробники для кнопок сортування
sortByNameAscBtn.addEventListener('click', () => {
    currentSortField = 'name';
    currentSortOrder = 'asc';
    applyFiltersAndSort();
});

sortByNameDescBtn.addEventListener('click', () => {
    currentSortField = 'name';
    currentSortOrder = 'desc';
    applyFiltersAndSort();
});

sortByUsernameAscBtn.addEventListener('click', () => {
    currentSortField = 'username';
    currentSortOrder = 'asc';
    applyFiltersAndSort();
});

sortByUsernameDescBtn.addEventListener('click', () => {
    currentSortField = 'username';
    currentSortOrder = 'desc';
    applyFiltersAndSort();
});


// --- Ініціалізація додатку ---

/**
 * Головна асинхронна функція для ініціалізації додатку.
 * Завантажує дані та налаштовує початковий вигляд.
 */
async function initializeApp() {
    resultsDiv.innerHTML = 'Завантаження даних...'; // Початкове повідомлення
    try {
        // Завантажуємо всі дані користувачів
        allUsers = await getUsers();
        console.log('Дані успішно завантажені:', allUsers);

        // Встановлюємо початкове значення фільтрації, якщо потрібно
        // cityFilterInput.value = 'Gwenborough'; // Можна встановити початкове місто
        // currentFilterCity = 'Gwenborough';

        // Застосовуємо початкові фільтри та сортування і відображаємо результат
        applyFiltersAndSort();

    } catch (error) {
        // Обробка критичних помилок (наприклад, неможливість завантажити дані)
        console.error("Критична помилка ініціалізації додатку:", error);
        displayError(error.message);
    }
}

// Запускаємо ініціалізацію додатку при завантаженні скрипта
initializeApp();
