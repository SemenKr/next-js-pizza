'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/components/shared/lib/utils';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { addCartItem } from '../../../../services/cart';
import { useCartStore } from '@/store';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const addCartItem = useCartStore((state) => state.addCartItem)

	const onAddProduct = () => {
		addCartItem({
			productItemId: firstItem.id,
		})
	}
	const onAddPizza = (productItemId: number, ingredients: number[]) => {
		addCartItem({
			productItemId,
			ingredients
		})
	}

	return (
		<Dialog open={ Boolean(product) } onOpenChange={ () => router.back() }>
			<DialogContent
				className={ cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				) }>
				{
					isPizzaForm ? (
						<ChoosePizzaForm
							imageUrl={ product.imageUrl }
							name={ product.name }
							ingredients={ product.ingredients }
							items={ product.items }
							onSubmit={ onAddPizza } />
					) : (
						<ChooseProductForm
							imageUrl={ product.imageUrl }
							name={ product.name }
							price={ firstItem.price }
							onSubmit={ onAddProduct }
						/>
					)
				}
				{/* <ProductForm product={ product } onSubmit={ () => router.back() } /> */ }
			</DialogContent>
		</Dialog>
	);
};
