// Импортируем prisma-клиент для работы с базой данных и объекты NextRequest и NextResponse для обработки запросов
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// Асинхронная функция для обработки GET-запроса
export async function GET(request: NextRequest) {
	try {

		// Извлекаем токен корзины из куки 'cartToken'
		const token = request.cookies.get('cartToken')?.value;

		// Если токен не найден (корзина пуста), возвращаем пустую корзину с нулевым общим количеством
		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		// Если токен есть, ищем корзину в базе данных по этому токену
		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,  // Ищем корзину, соответствующую токену
					},
				],
			},
			include: {
				// Включаем связанные элементы корзины для получения полного состава
				items: {
					orderBy: {
						createdAt: 'desc',  // Сортируем элементы корзины по дате создания, начиная с последних
					},
					include: {
						productItem: {
							include: {
								product: true,  // Включаем полную информацию о продукте, связанном с элементом
							},
						},
						ingredients: true,  // Включаем ингредиенты, если они есть в элементе корзины
					},
				},
			},
		});

		// Возвращаем корзину в формате JSON
		return NextResponse.json(userCart);
	} catch (error) {
		// Если произошла ошибка, выводим её в консоль и возвращаем сообщение с кодом 500 (ошибка сервера)
		console.error(error);
		return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
	}
}
