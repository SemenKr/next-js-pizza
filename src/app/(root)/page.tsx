import { Container, Filters, Title, TopBar } from '@/components/shared';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { prisma } from "../../../prisma/prisma-client";
import React from "react";

export default async function Home() {

	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					items: true
				}
			}
		}
	});

	return (
		<main>
			<Container className='mt-10 pb-14'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar categories={ categories } />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					{/* Фильтрация */ }
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Список товаров */ }
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{ categories.map((category) => (
								category.products.length > 0 && (
									<ProductsGroupList
										key={ category.id }
										title={ category.name }
										items={ category.products }
										categoryId={ category.id } />
								)
							)) }
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}
