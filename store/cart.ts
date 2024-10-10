import { create } from 'zustand';
import { Api } from '../services/api-client'; // API клиент для взаимодействия с сервером
import { CartStateItem, getCartDetails } from '../shared/components/shared/lib/get-cart-details';
import { CreateCartItemValues } from '@/shared/components/shared/services/dto/cart.dto'; // Тип данных для добавления товара в корзину

// Интерфейс состояния корзины
export interface CartState {
	loading: boolean; // Индикатор загрузки
	error: boolean; // Индикатор ошибки
	totalAmount: number; // Общая сумма корзины
	items: CartStateItem[]; // Массив товаров в корзине

	// Функция для получения товаров из корзины
	fetchCartItems: () => Promise<void>;

	// Функция для обновления количества товара в корзине
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;

	// Функция для добавления товара в корзину
	addCartItem: (values: CreateCartItemValues) => Promise<void>;

	// Функция для удаления товара из корзины
	removeCartItem: (id: number) => Promise<void>;
}

// Создание хранилища состояния корзины с помощью zustand
export const useCartStore = create<CartState>((set, get) => ({
	items: [], // Изначально корзина пуста
	error: false, // Ошибок нет
	loading: true, // Устанавливаем индикатор загрузки на `true`
	totalAmount: 0, // Изначально общая сумма равна 0

	// Функция для получения товаров из корзины
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false }); // Начинаем загрузку, сбрасываем ошибку
			const data = await Api.cart.getCart(); // Запрашиваем данные корзины с сервера
			set(getCartDetails(data)); // Обновляем состояние корзины данными
		} catch (error) {
			console.error(error); // Логируем ошибку
			set({ error: true }); // Устанавливаем индикатор ошибки
		} finally {
			set({ loading: false }); // Останавливаем индикатор загрузки
		}
	},

	// Функция для обновления количества товара в корзине
	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false }); // Начинаем загрузку, сбрасываем ошибку
			const data = await Api.cart.updateItemQuantity(id, quantity); // Отправляем запрос на сервер для обновления количества
			set(getCartDetails(data)); // Обновляем данные корзины
		} catch (error) {
			console.error(error); // Логируем ошибку
			set({ error: true }); // Устанавливаем индикатор ошибки
		} finally {
			set({ loading: false }); // Останавливаем индикатор загрузки
		}
	},

	// Функция для удаления товара из корзины
	removeCartItem: async (id: number) => {
		try {
			set((state) => ({
				loading: true,
				error: false,
				// Помечаем товар как "disabled" во время удаления
				items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
			}));
			const data = await Api.cart.removeCartItem(id); // Отправляем запрос на удаление товара
			set(getCartDetails(data)); // Обновляем данные корзины
		} catch (error) {
			console.error(error); // Логируем ошибку
			set({ error: true }); // Устанавливаем индикатор ошибки
		} finally {
			// Возвращаем товары в исходное состояние
			set((state) => ({
				loading: false,
				items: state.items.map((item) => ({ ...item, disabled: false })),
			}));
		}
	},

	// Функция для добавления товара в корзину
	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false }); // Начинаем загрузку, сбрасываем ошибку
			const data = await Api.cart.addCartItem(values); // Отправляем запрос на добавление товара
			set(getCartDetails(data)); // Обновляем данные корзины
		} catch (error) {
			console.error(error); // Логируем ошибку
			set({ error: true }); // Устанавливаем индикатор ошибки
		} finally {
			set({ loading: false }); // Останавливаем индикатор загрузки
		}
	},
}));
