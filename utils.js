// utils.js - Модуль для маніпуляції даними (фільтрація, сортування)
// Опис: Цей модуль містить допоміжні функції для обробки списку користувачів,
// такі як фільтрація за певним критерієм та сортування за різними полями.

/**
 * Фільтрує масив об'єктів користувачів за заданою назвою міста.
 * @param {Array<Object>} users - Вхідний масив об'єктів користувачів.
 * @param {string} city - Назва міста, за якою потрібно фільтрувати. Регістр не враховується.
 * @returns {Array<Object>} Новий масив, що містить тільки користувачів з вказаного міста.
 */
export function filterByCity(users, city) {
    if (!city) {
        return users; // Якщо місто не вказано, повертаємо всіх користувачів
    }
    const lowerCaseCity = city.toLowerCase(); // Приводимо місто до нижнього регістру для порівняння без врахування регістру
    return users.filter(user =>
        user.address && user.address.city && user.address.city.toLowerCase() === lowerCaseCity
    );
}

/**
 * Сортує масив об'єктів користувачів за вказаним полем та порядком.
 * @param {Array<Object>} users - Вхідний масив об'єктів користувачів.
 * @param {string} field - Назва поля, за яким потрібно сортувати (наприклад, 'name' або 'username').
 * @param {string} order - Порядок сортування: 'asc' (за зростанням) або 'desc' (за спаданням).
 * @returns {Array<Object>} Новий масив, що є відсортованою копією вхідного масиву.
 */
export function sortUsers(users, field, order = 'asc') {
    // Створюємо копію масиву, щоб не змінювати оригінальний масив
    return [...users].sort((a, b) => {
        const valA = a[field] ? String(a[field]).toLowerCase() : ''; // Отримуємо значення поля, приводимо до рядка та нижнього регістру
        const valB = b[field] ? String(b[field]).toLowerCase() : '';

        if (valA < valB) {
            return order === 'asc' ? -1 : 1; // Якщо A менше B, повертаємо -1 для зростання, 1 для спадання
        }
        if (valA > valB) {
            return order === 'asc' ? 1 : -1; // Якщо A більше B, повертаємо 1 для зростання, -1 для спадання
        }
        return 0; // Якщо рівні
    });
}
