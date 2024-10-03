import React from 'react';
import { cn } from '@/lib/utils';
import { ProductImage } from './product-image';
import { Title } from './title';
import Image from "next/image";
import { GroupVariants } from './group-variant';
import { Button } from '../ui';

interface Props {
	imageUrl: string;
	name: string;
	ingredients: any[];
	items: any[];
	loading?: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className, }) => {

	const textDetails = 'Вшитое описание'
	const totalPrice = 350
	return (
		<div className={ cn(className, 'flex flex-1') }>
			<div className={ cn('flex items-center justify-center flex-1 relative w-full', className) }>
				<Image
					src={ imageUrl }
					alt="Logo"
					width={ 350 }
					height={ 350 }
					className={ cn('relative left-2 top-2 transition-all z-10 duration-300') }
					priority // Это для preloading, если нужно
				/>
			</div>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={ name } size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{ textDetails }</p>

				<div className="flex flex-col gap-4 mt-5">

				</div>

				<Button
					loading={ loading }
					// onClick={ handleClickAdd }
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за { totalPrice } ₽
				</Button>
			</div>
		</div>
	);
};