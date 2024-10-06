import React from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Title } from './title';
import { Button } from '../ui';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';
import { cn } from '@/shared/components/shared/lib/utils';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	className?: string;
	ingredients: Ingredient[];
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className, ingredients, }) => {
	return (
		<div className={ cn(className) }>
			<Link href={ `/product/${id}` }>

				<div className={ 'flex justify-center p-6 bg-secondary rounded-lg h-[260px]' }>
					<Image className="w-[215px] h-[215px]" src={ imageUrl } alt={ name } width={ 215 } height={ 215 } priority={ true } />
				</div>

				<Title text={ name } size="sm" className="mb-1 mt-3 font-bold" />

				<p className="text-sm text-gray-400">
					{ ingredients.map((ingredient) => ingredient.name).join(', ') }
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						от <b>{ price } ₽</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={ 20 } className="mr-1" />
						Добавить
					</Button>
				</div>

			</Link>
		</div>
	);
};