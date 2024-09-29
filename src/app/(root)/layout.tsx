import type { Metadata } from "next";
import { Header } from '@/components/shared';

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
		<html lang="en">
			<Header />
			<main className='min-h-screen'>
				{ children }
			</main>
		</html>
	);
}
