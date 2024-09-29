import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { Header } from '@/components/shared';

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: "Pizza-NextJs",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={ nunito.variable } lang="en">
			<head>
				<link data-rh="true" rel="icon" href="/favicon.ico" />
			</head>
			<body>

				<Header />
				<main className='min-h-screen'>
					{ children }
				</main>

			</body>
		</html>
	);
}
