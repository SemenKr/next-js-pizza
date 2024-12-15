import { notFound } from 'next/navigation';
import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10">
			<div className={ "flex flex-1" }>
				<PizzaImage imageUrl={ product.imageUrl } size={ 30 } />

				<div className={ "w-[490px] bg-[#F7F6F5] p-7" }>
					<Title text={ product.name } size={ "md" } className={ "font-extrabold mb-1" } />


					<p className={ "text-gray-400" }>Lorem ipsum dolor sit , consectetur  , sed do   incident ut labore et dolor Magna aqua. </p>

					<GroupVariants
						value='2'
						items={ [
							{
								name: 'Маленькая',
								value: '1',

							},
							{
								name: 'Средняя',
								value: '2',
							},
							{
								name: 'Большая',
								value: '3',
								disabled: false,
							},
						] } />
				</div>
			</div>

		</Container>
	);
}
