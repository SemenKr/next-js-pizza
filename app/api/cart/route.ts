// Импортируем prisma-клиент для работы с базой данных и объекты NextRequest и NextResponse для обработки запросов
import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
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
export async function POST(req: NextRequest) {
	try {
		// Получаем токен корзины из cookies, если он существует
		let token = req.cookies.get('cartToken')?.value;

		// Если токена нет, создаём новый UUID для идентификации корзины
		if (!token) {
			token = crypto.randomUUID();
		}

		// Находим или создаём корзину для пользователя по токену
		const userCart = await findOrCreateCart(token);

		// Получаем данные из тела запроса, приводим к типу CreateCartItemValues
		const data = (await req.json()) as CreateCartItemValues;

		// Ищем товар в корзине, проверяя наличие аналогичного продукта с теми же ингредиентами
		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id, // ID корзины пользователя
				productItemId: data.productItemId, // ID продукта
				ingredients: {
					every: {
						id: { in: data.ingredients }, // Все выбранные ингредиенты должны совпадать
					},
				},
			},
		});

		// Если товар найден, увеличиваем количество на +1
		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id, // ID найденного товара
				},
				data: {
					quantity: findCartItem.quantity + 1, // Увеличиваем количество
				},
			});
		} else {
			// Если товар не найден, создаём новый элемент корзины с выбранными ингредиентами
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id, // Привязка к корзине пользователя
					productItemId: data.productItemId, // ID продукта
					quantity: 1, // Устанавливаем количество товара как 1
					ingredients: { connect: data.ingredients?.map((id) => ({ id })) }, // Связываем ингредиенты
				},
			});
		}

		// Обновляем общую сумму корзины после добавления/обновления товара
		const updatedUserCart = await updateCartTotalAmount(token);

		// Создаём ответ с обновлённой корзиной и устанавливаем токен в cookies
		const resp = NextResponse.json(updatedUserCart);
		resp.cookies.set('cartToken', token); // Сохраняем токен корзины в cookies
		return resp;
	} catch (error) {
		// Логируем ошибку на сервере и возвращаем сообщение об ошибке
		console.log('[CART_POST] Server error', error);
		return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
	}
}