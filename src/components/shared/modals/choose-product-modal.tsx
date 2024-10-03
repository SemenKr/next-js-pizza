'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import { ChooseProductForm } from '../choose-product-form';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isPizzaForm = product


	return (
		<Dialog open={ Boolean(product) } onOpenChange={ () => router.back() }>
			<DialogContent
				className={ cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				) }>
				<ChooseProductForm imageUrl={ product.imageUrl } name={ product.name } ingredients={ [] } items={ [] } onSubmit={ function (itemId: number, ingredients: number[]): void {
					throw new Error('Function not implemented.');
				} } />
				{/* <ProductForm product={ product } onSubmit={ () => router.back() } /> */ }
			</DialogContent>
		</Dialog>
	);
};
