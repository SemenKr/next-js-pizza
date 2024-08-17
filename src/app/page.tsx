import { Categories, Container, Filters, SortPopup, Title, TopBar } from '@/components/shared';

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
				</div>
			</Container>
    </main>
  );
}
