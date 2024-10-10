import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants';
import { CartStateItem } from './get-cart-details';

// Функция для формирования строки с подробной информацией о товаре в корзине
export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'], // Ингредиенты для пиццы
	pizzaType?: PizzaType, // Опциональный тип пиццы (тонкая, толстая и т.д.)
	pizzaSize?: PizzaSize, // Опциональный размер пиццы (в см)
): string => {
	// Массив для хранения деталей о товаре
	const details = [];

	// Если указаны и тип пиццы, и размер
	if (pizzaSize && pizzaType) {
		// Находим название типа пиццы, используя карту `mapPizzaType`
		const typeName = mapPizzaType[pizzaType];
		// Добавляем в массив строку вида "Тип пиццы, размер см"
		details.push(`${typeName} ${pizzaSize} см`);
	}

	// Если ингредиенты переданы
	if (ingredients) {
		// Добавляем в массив названия всех ингредиентов
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	// Объединяем элементы массива в строку, разделенную запятыми, и возвращаем её
	return details.join(', ');
};