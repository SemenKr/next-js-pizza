import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Container } from './container';

interface Props {
	className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('border border-b', className)}>
			<Container className={'flex items-center justify-between py-8'}>
				{/* Левая часть */}
				<div className="flex items-center gap-4">
					<Image src='/logo.png' alt="logo" width={35} height={35} />
					<div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
				</div>
				{/* Правая часть */}
				<div className="flex items-center gap-3">


         </div>
			</Container>
		</header>
	);
};