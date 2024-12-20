'use client'
import React, { useEffect } from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '../../store/category';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '../../../@types/prisma';


interface Props {
	title: string;
	items: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	listClassName,
	categoryId,
	className,
}) => {

	const setActiveId = useCategoryStore((state) => state.setActiveId);

	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: .4
	});

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveId(categoryId);
		}
	}, [categoryId, setActiveId, intersection?.isIntersecting]);

	return (
		<div className={ cn(className) } id={ title } ref={ intersectionRef }>
			<Title text={ title } size="lg" className="font-extrabold mb-5" />

			<div className={ cn('grid grid-cols-3 gap-[50px]', listClassName) }>
				{ items.map((product) => (
					<ProductCard
						key={ product.id }
						id={ product.id }
						name={ product.name }
						imageUrl={ product.imageUrl }
						price={ product.items[0].price }
						ingredients={ product.ingredients }
					/>
				)) }
			</div>
		</div>
	);
};
