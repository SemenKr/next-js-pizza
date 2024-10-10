import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { useCartStore } from '@/store';
import React from 'react';
import { CartStateItem } from '../components/shared/lib/get-cart-details';

type ReturnProps = {
	totalAmount: number;
	items: CartStateItem[];
	loading: boolean;
	updateItemQuantity: (id: number, quantity: number) => void;
	removeCartItem: (id: number) => void;
	addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
	const cartState = useCartStore((state) => state);

	React.useEffect(() => {
		cartState.fetchCartItems();
	}, []);

	return cartState;
};
