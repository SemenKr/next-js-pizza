import { CartItemDTO } from '../services/dto/cart.dto';

// Функция для расчета общей цены товара в корзине
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	// Рассчитываем общую стоимость всех ингредиентов
	const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

	// Возвращаем итоговую стоимость товара:
	// Цена продукта (с учетом ингредиентов) умножается на количество
	return (ingredientsPrice + item.productItem.price) * item.quantity;
};