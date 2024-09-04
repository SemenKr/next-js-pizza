'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '../../../store/category';
import {Category} from "@prisma/client";

interface Props {
	className?: string;
	items: Category[];
}

const categories = [
	{ id: 1, name: 'Пиццы' },
	{ id: 2, name: 'Комбо' },
	{ id: 3, name: 'Завтраки' },
	{ id: 4, name: 'Гриль' },
	{ id: 5, name: 'Острые' },
	{ id: 6, name: 'Закрытые' },
];

export const Categories: React.FC<Props> = ({items, className }) => {

const categoryActiveId = useCategoryStore((state) => state.activeId);

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50  p-1 rounded-2xl ', className)}>
			{items.map(({name , id}, index) => (
				<a className={cn(
					'flex items-center h-11 rounded-2xl px-5 font-bold',
					categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
				)}
				key={index}
				href={`#${name}`}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	);
};
