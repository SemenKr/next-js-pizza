import React from 'react';
import { Title } from './title';
import Image from "next/image";
import { Button } from '../ui';
import { cn } from '@/shared/components/shared/lib/utils';

interface Props {
	imageUrl: string;
	name: string;
	loading?: boolean;
	className?: string;
	onSubmit: VoidFunction;
}

/**
 * Форма выбора продукта
 */

export const ChooseProductForm: React.FC<Props> = ({
	name,
	imageUrl,
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
					onClick={ onSubmit }
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за { totalPrice } ₽
				</Button>
			</div>
		</div>
	);
};