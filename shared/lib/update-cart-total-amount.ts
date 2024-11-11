import { prisma } from '@/prisma/prisma-client'; // Импортируем клиента Prisma для работы с базой данных
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'; // Импортируем функцию для расчета общей стоимости товара в корзине

// Асинхронная функция для обновления общей суммы корзины пользователя
export const updateCartTotalAmount = async (token: string) => {
	// Находим корзину пользователя по токену
	const userCart = await prisma.cart.findFirst({
		where: {
			token, // Фильтруем корзину по переданному токену
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc', // Сортируем товары по дате создания (в порядке убывания)
				},
				include: {
					productItem: {
						include: {
							product: true, // Включаем информацию о продукте
						},
					},
					ingredients: true, // Включаем информацию об ингредиентах
				},
			},
		},
	});

	// Если корзина не найдена, выходим из функции
	if (!userCart) {
		return;
	}

	// Рассчитываем общую сумму для всех товаров в корзине
	const totalAmount = userCart.items.reduce((acc, item) => {
		return acc + calcCartItemTotalPrice(item); // Суммируем стоимость каждого товара
	}, 0);

	// Обновляем общую сумму в корзине и возвращаем обновлённую корзину
	return await prisma.cart.update({
		where: {
			id: userCart.id, // Находим корзину по её идентификатору
		},
		data: {
			totalAmount, // Обновляем поле totalAmount
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc', // Сортируем товары по дате создания
				},
				include: {
					productItem: {
						include: {
							product: true, // Включаем информацию о продукте
						},
					},
					ingredients: true, // Включаем информацию об ингредиентах
				},
			},
		},
	});
};