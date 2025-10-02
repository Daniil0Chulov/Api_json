// api.js

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Завантажує список користувачів з API.
 * @returns {Promise<Array<Object>>} Масив об'єктів користувачів.
 */
export async function getUsers() {
    try {
        const response = await fetch(USERS_API_URL);

        // 1. Обробка мережевих помилок (Завдання 5)
        if (!response.ok) {
            throw new Error(`Мережева помилка! Статус: ${response.status}`);
        }

        // 2. Парсинг JSON (response.json() також обробляє невалідний JSON,
        // кидаючи синтаксичну помилку, яка буде спіймана у зовнішньому catch).
        const data = await response.json();
        return data;

    } catch (error) {
        // Кидаємо помилку далі, щоб main.js міг її обробити і відобразити
        if (error instanceof SyntaxError) {
             throw new Error('Помилка парсингу JSON: Невалідний формат даних.');
        }
        throw error;
    }
}