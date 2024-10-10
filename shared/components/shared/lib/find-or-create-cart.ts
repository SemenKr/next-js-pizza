import { prisma } from '@/prisma/prisma-client';

// Функция для поиска или создания корзины
export const findOrCreateCart = async (token: string) => {
	// Пытаемся найти корзину по токену
	let userCart = await prisma.cart.findFirst({
		where: {
			token, // Ищем корзину с указанным токеном
		},
	});

	// Если корзина не найдена, создаём новую
	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token, // Привязываем новый токен к корзине
			},
		});
	}

	// Возвращаем найденную или созданную корзину
	return userCart;
};