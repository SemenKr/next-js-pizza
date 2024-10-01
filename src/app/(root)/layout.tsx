import { Header } from '@/components/shared';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">
			<Suspense fallback={ <div>Загрузка заголовка...</div> }>
				<Header />
			</Suspense>
			{ children }
			{ modal && (
				<Suspense fallback={ <div>Загрузка модального окна...</div> }>
					{ modal }
				</Suspense>
			) }
		</main>
	);
}
