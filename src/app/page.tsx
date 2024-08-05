import { Categories, Container, SortPopup, Title } from '@/components/shared';

export default function Home() {
  return (
    <main>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold'/>

				<Categories />
				<SortPopup />
			</Container>
    </main>
  );
}
