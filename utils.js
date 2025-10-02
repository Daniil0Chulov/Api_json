// utils.js

/**
 * Фільтрує користувачів за містом.
 * @param {Array<Object>} users - Список користувачів.
 * @param {string} city - Місто, за яким потрібно фільтрувати.
 * @returns {Array<Object>} Відфільтрований список.
 */
export function filterByCity(users, city) {
    // Доступ до міста: user.address.city
    return users.filter(user => user.address.city === city);
}

/**
 * Сортує користувачів за ім'ям (в алфавітному порядку).
 * @param {Array<Object>} users - Список користувачів.
 * @returns {Array<Object>} Відсортований список.
 */
export function sortByName(users) {
    // Використовуємо localeCompare для коректного порівняння рядків
    return users.sort((a, b) => a.name.localeCompare(b.name));
}