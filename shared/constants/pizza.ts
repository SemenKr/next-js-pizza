/**
 * Вспомогательные константы
 */
// Сопоставление размеров пиццы с их названиями
export const mapPizzaSize = {
	20: 'Маленькая',
	30: 'Средняя',
	40: 'Большая',
} as const; // Используем "as const", чтобы значения были неизменяемыми и типы соответствовали этим значениям

// Сопоставление типов теста пиццы с их названиями
export const mapPizzaType = {
	1: 'традиционная',
	2: 'тонкая',
} as const; // "as const" делает объект неизменяемым и строго типизированным

// Преобразуем mapPizzaSize в массив объектов с полями "name" и "value"
// Это удобно для отображения списка выбора (например, в интерфейсе пользователя)
export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,  // Название размера пиццы
	value, // Значение размера пиццы (20, 30, 40)
}));

// Преобразуем mapPizzaType в массив объектов с полями "name" и "value"
// Подобно предыдущему, это удобно для выбора типа пиццы
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,  // Название типа теста пиццы
	value, // Значение типа теста (1, 2)
}));

// Тип для размера пиццы: может быть 20, 30 или 40
export type PizzaSize = keyof typeof mapPizzaSize;

// Тип для типа пиццы: может быть 1 или 2
export type PizzaType = keyof typeof mapPizzaType;
