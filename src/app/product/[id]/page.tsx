import { notFound } from 'next/navigation';
import {prisma} from "../../../../prisma/prisma-client";
import {Container} from "@/components/shared";
import {ProductImage} from "@/components/shared/product-image";

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
			<ProductImage imageUrl={product.imageUrl} size={30} />
		</Container>
	);
}
