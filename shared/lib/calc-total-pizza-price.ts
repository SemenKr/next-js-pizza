import { PizzaType, PizzaSize } from '@/shared/constants';
import { Ingredient, ProductItem } from '@prisma/client';

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param items - список вариаций пицц (содержит информацию о разных типах и размерах пицц)
 * @param ingredients - список ингредиентов, доступных для добавления в пиццу
 * @param selectedIngredients - множество идентификаторов выбранных ингредиентов
 *
 * @returns number общую стоимость пиццы, включая выбранные ингредиенты
 */
export const calcTotalPizzaPrice = (
	type: PizzaType, // Тип теста пиццы (например, тонкое или традиционное)
	size: PizzaSize, // Размер пиццы (например, маленькая, средняя или большая)
	items: ProductItem[], // Список доступных пицц с разными комбинациями типа теста и размера
	ingredients: Ingredient[], // Список всех доступных ингредиентов, которые можно добавить в пиццу
	selectedIngredients: Set<number>, // Множество, содержащее идентификаторы выбранных пользователем ингредиентов
) => {
	// Находим цену пиццы по типу теста и размеру
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

	// Суммируем стоимость всех выбранных ингредиентов
	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id)) // Оставляем только те ингредиенты, которые выбрал пользователь
		.reduce((acc, ingredient) => acc + ingredient.price, 0); // Суммируем стоимость выбранных ингредиентов

	// Возвращаем общую стоимость: базовая цена пиццы + стоимость выбранных ингредиентов
	return pizzaPrice + totalIngredientsPrice;
};