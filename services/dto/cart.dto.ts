import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

// Тип данных для элемента корзины
export type CartItemDTO = CartItem & {
	productItem: ProductItem & { // Продуктовый элемент (например, разновидность продукта)
		product: Product; // Продукт (например, пицца или напиток)
	};
	ingredients: Ingredient[]; // Список ингредиентов
};

// Интерфейс для корзины, расширяющий тип корзины из Prisma
export interface CartDTO extends Cart {
	items: CartItemDTO[]; // Список элементов корзины
}

// Интерфейс для данных, необходимых для добавления нового элемента в корзину
export interface CreateCartItemValues {
	productItemId: number; // ID продуктового элемента
	ingredients?: number[]; // Опциональный список ID ингредиентов
}