import { Ingredient, ProductItem } from '@prisma/client'; // Импорт типов ингредиентов и продуктов из Prisma модели
import { calcTotalPizzaPrice } from './calc-total-pizza-price'; // Импорт функции для подсчета общей стоимости пиццы
import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants'; // Импорт типов размера и теста пиццы, а также маппинга типов теста

/**
 * Функция для получения подробной информации о выбранной пицце
 *
 * @param type - тип теста выбранной пиццы (например, тонкое или традиционное)
 * @param size - размер выбранной пиццы (например, 30 см)
 * @param items - список вариаций пицц (содержит информацию о различных размерах и типах теста)
 * @param ingredients - список ингредиентов, доступных для добавления в пиццу
 * @param selectedIngredients - множество идентификаторов выбранных ингредиентов
 *
 * @returns объект с общей стоимостью пиццы и текстовым описанием выбранной пиццы
 */
export const getPizzaDetails = (
	type: PizzaType, // Тип теста выбранной пиццы (например, тонкое или традиционное)
	size: PizzaSize, // Размер выбранной пиццы (например, 30 см)
	items: ProductItem[], // Список продуктов (пицц) с разными вариациями
	ingredients: Ingredient[], // Список доступных ингредиентов
	selectedIngredients: Set<number>, // Множество идентификаторов выбранных ингредиентов
) => {
	// Вычисляем общую стоимость пиццы, используя функцию calcTotalPizzaPrice
	const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);

	// Генерируем текстовое описание пиццы (например, "30 см, традиционное тесто")
	const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

	// Возвращаем объект с общей стоимостью пиццы и текстовым описанием
	return { totalPrice, textDetails: textDetails };
};