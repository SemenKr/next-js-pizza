'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/components/shared/lib/utils';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { ChoosePizzaForm } from '../choose-pizza-form';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.items[0].pizzaType)


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
							onSubmit={ () => console.log('submit') } />
					) : (
						<ChooseProductForm imageUrl={ product.imageUrl } name={ product.name } />
					)
				}
				{/* <ProductForm product={ product } onSubmit={ () => router.back() } /> */ }
			</DialogContent>
		</Dialog>
	);
};
