import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';

interface Props {
  title: string;
  items: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({ 
	title,
  items,
  listClassName,
  categoryId,
  className, }) => {
	return (
		<div className={cn(className)}  id={title}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
			{items.map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price}
            />
          ))}
			</div>
		</div>
	);
};