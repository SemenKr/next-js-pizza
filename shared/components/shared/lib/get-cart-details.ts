import { calcCartItemTotalPrice } from '.';
import { CartDTO } from '../services/dto/cart.dto';

// Описание типа для элементов корзины
export type CartStateItem = {
	id: number;  // Идентификатор товара
	quantity: number;  // Количество товара в корзине
	name: string;  // Название товара
	imageUrl: string;  // URL изображения товара
	price: number | null;  // Итоговая цена товара (может быть null, если цена не указана)
	disabled?: boolean;  // Флаг, который может отключить товар (например, если он недоступен)
	pizzaSize?: number | null;  // Размер пиццы (если применимо)
	pizzaType?: number | null;  // Тип пиццы (если применимо)
	ingredients: Array<{ name: string; price: number }>;  // Массив ингредиентов, каждый из которых имеет название и цену
};

// Описание возвращаемых данных: массив элементов корзины и общая сумма
interface ReturnProps {
	items: CartStateItem[];  // Массив товаров в корзине
	totalAmount: number;  // Общая сумма корзины
}

// Основная функция для преобразования данных корзины из вложенных в плоский объект с необходимыми данными
export const getCartDetails = (data: CartDTO): ReturnProps => {
	// Преобразуем элементы корзины (data.items) из DTO (Data Transfer Object) в массив CartStateItem[]
	const items = data.items.map((item): CartStateItem => ({
		id: item.id,  // Берем id товара из DTO
		quantity: item.quantity,  // Количество товара
		name: item.productItem.product.name,  // Название товара из вложенного объекта product
		imageUrl: item.productItem.product.imageUrl,  // URL изображения
		price: calcCartItemTotalPrice(item),  // Вычисляем общую стоимость товара с помощью функции
		pizzaSize: item.productItem.size,  // Размер пиццы, если применимо (иначе null)
		pizzaType: item.productItem.pizzaType,  // Тип пиццы, если применимо (иначе null)
		disabled: false,  // Устанавливаем флаг disabled (по умолчанию товар активен)
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,  // Название ингредиента
			price: ingredient.price,  // Цена ингредиента
		})),  // Преобразуем массив ингредиентов из DTO
	}));

	// Возвращаем массив товаров и общую сумму корзины
	return {
		items,
		totalAmount: data.totalAmount,  // Общая сумма корзины, переданная в DTO
	};
};
