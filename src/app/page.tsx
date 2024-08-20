import { Categories, Container, Filters, SortPopup, Title, TopBar } from '@/components/shared';
import { ProductCard } from '@/components/shared/product-card';

export default function Home() {
  return (
    <main>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold'/>
			</Container>
			<TopBar />

			<Container className='pb-14'>
				<div className='flex gap-[60px]'>
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Список товаров */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductCard id={0} name={'Чизбургер-пицца'} price={550} imageUrl={'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.avif'} />
						</div>
					</div>
				</div>
			</Container>
    </main>
  );
}
