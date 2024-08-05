import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const activeIndex = 3;

export const Categories: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('inline-flex gap-1 bg-gray-50  p-2 rounded-2xl ', className)}>
			{categories.map((category, index) => (
				<a className={cn(
					'flex items-center h-11 rounded-2xl px-5 font-bold',
					activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary',
				)} key={index}>
					<button>{category}</button>
				</a>
			))}
		</div>
	);
};