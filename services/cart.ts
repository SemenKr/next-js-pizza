import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

// Получить информацию о корзине
export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>('/cart')).data;
};

// Обновить количество определённого товара в корзине
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
	return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data;
};

// Удалить товар из корзины по его ID
export const removeCartItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
};

// Добавить новый товар в корзину
export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	return (await axiosInstance.post<CartDTO>('/cart', values)).data;
};