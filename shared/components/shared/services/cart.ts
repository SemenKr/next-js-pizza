// Импортируем настроенный экземпляр axios и необходимые DTO (Data Transfer Object)
import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

// Функция для получения данных корзины
export const getCart = async (): Promise<CartDTO> => {
	// Делаем GET-запрос на '/cart' и возвращаем данные корзины
	return (await axiosInstance.get<CartDTO>('/cart')).data;
};

// Функция для обновления количества товара в корзине
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
	// Делаем PATCH-запрос на '/cart/{itemId}', передавая новое количество товара
	return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
};

// Функция для удаления товара из корзины
export const removeCartItem = async (id: number): Promise<CartDTO> => {
	// Делаем DELETE-запрос на '/cart/{id}', чтобы удалить товар из корзины
	return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
};

// Функция для добавления нового товара в корзину
export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	// Делаем POST-запрос на '/cart', передавая данные нового товара, который нужно добавить в корзину
	return (await axiosInstance.post<CartDTO>('/cart', values)).data;
};
