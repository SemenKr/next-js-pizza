import { Categories, Container, Filters, SortPopup, Title, TopBar } from '@/components/shared';
import { ProductCard } from '@/components/shared/product-card';
import { ProductsGroupList } from '@/components/shared/products-group-list';

export default function Home() {
  return (
    <main>
			<Container className='mt-10 pb-14'>
				<Title text='Все пиццы' size='lg' className='font-extrabold'/>
			</Container>
			<TopBar />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Список товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList title={'Пиццы'} items={[
								{
									id: 1,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 2,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 3,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 4,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 5,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 6,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 7,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
								{
									id: 8,
									name: 'Чоризо фреш',
									imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
									price: 300,
									items: [{price: 300}]
								},
							]} categoryId={1} 	/>
							<ProductsGroupList title={'Завтрак'} items={[
															{
																id: 1,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 2,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 3,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 4,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 5,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 6,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 7,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
															{
																id: 8,
																name: 'Чоризо фреш',
																imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif',
																price: 300,
																items: [{price: 300}]
															},
							]} categoryId={2} 	/>
						</div>
					</div>
				</div>
			</Container>
    </main>
  );
}
