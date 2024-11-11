'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';
import { error } from 'console';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType)
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);


	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try{
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(product.name + 'добавлена в корзину')
			router.back()

		} catch (error) {
			toast.error('Произошла ошибка при добавлении в корзину')
			console.error(error)
		}
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
							onSubmit={ onSubmit }
							loading={loading}
							/>
					) : (
						<ChooseProductForm
							imageUrl={ product.imageUrl }
							name={ product.name }
							price={ firstItem.price }
							onSubmit={ onSubmit }
							loading={loading}
						/>
					)
				}
				{/* <ProductForm product={ product } onSubmit={ () => router.back() } /> */ }
			</DialogContent>
		</Dialog>
	);
};
