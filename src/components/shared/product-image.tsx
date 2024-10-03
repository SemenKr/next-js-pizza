import React from 'react';
import { cn } from '@/src/lib/utils';
import Image from "next/image";

interface Props {
	className?: string;
	imageUrl: string;
	size: 20 | 30 | 40;
}

export const ProductImage: React.FC<Props> = ({ imageUrl, size, className }) => {
	return (
		<div className={ cn('flex items-center justify-center flex-1 relative w-full', className) }>


			<Image
				src={ imageUrl }
				alt="Logo"
				className={ cn('relative left-2 top-2 transition-all z-10 duration-300') }
				width={ size === 20 ? 300 : size === 30 ? 400 : 500 }
				height={ size === 20 ? 300 : size === 30 ? 400 : 500 }
				priority // Это для preloading, если нужно
			/>

			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
		</div>
	);
};
