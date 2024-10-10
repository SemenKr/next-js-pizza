'use client';

import React from 'react';
import Image from 'next/image'; // Импорт компонента для работы с изображениями в Next.js
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet'; // Компоненты для боковой панели (Sheet)
import Link from 'next/link'; // Импорт для работы с навигацией
import { Button } from '../ui'; // Кастомная кнопка из UI-компонентов
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Импорт иконок для стрелок
import { CartDrawerItem } from './cart-drawer-item'; // Компонент для отображения отдельного элемента корзины
import { getCartItemDetails } from './lib'; // Функция для получения деталей товара
import { cn } from './lib/utils'; // Вспомогательная функция для условных классов
import { PizzaSize, PizzaType } from '@/shared/constants'; // Константы для типов пиццы
import { Title } from './title'; // Компонент для отображения заголовков
import { useCart } from '@/shared/hooks'; // Кастомный хук для работы с корзиной

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {

	// Получаем данные о корзине и функции для её изменения из хука useCart
	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
	// Локальное состояние для контроля перенаправления при нажатии на кнопку оформления заказа
	const [redirecting, setRedirecting] = React.useState(false);

	// Функция для обработки кликов по кнопкам изменения количества товара
	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1; // Увеличение или уменьшение количества
		updateItemQuantity(id, newQuantity); // Вызов функции обновления количества
	};

	return (
		<Sheet>
			{/* Триггер для открытия боковой панели (в данном случае это переданные дети) */ }
			<SheetTrigger asChild>{ children }</SheetTrigger>

			{/* Содержимое боковой панели */ }
			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<div className={ cn('flex flex-col h-full', !totalAmount && 'justify-center') }>
					{/* Если в корзине есть товары, отображаем заголовок с количеством */ }
					{ totalAmount > 0 && (
						<SheetHeader>
							<SheetTitle>
								В корзине <span className="font-bold">{ items.length } товара</span>
							</SheetTitle>
						</SheetHeader>
					) }
					{/* Если корзина пуста, отображаем соответствующее сообщение с изображением */ }
					{ !totalAmount && (
						<div className="flex flex-col items-center justify-center w-72 mx-auto">
							<Image src="/assets/images/empty-box.png" alt="Empty cart" width={ 120 } height={ 120 } />
							<Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
							<p className="text-center text-neutral-500 mb-5">
								Добавьте хотя бы одну пиццу, чтобы совершить заказ
							</p>

							{/* Кнопка для закрытия боковой панели и возврата назад */ }
							<SheetClose>
								<Button className="w-56 h-12 text-base" size="lg">
									<ArrowLeft className="w-5 mr-2" />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					) }

					{/* Если в корзине есть товары, отображаем их список */ }
					{ totalAmount > 0 && (
						<>
							{/* Список товаров, которые находятся в корзине */ }
							<div className="-mx-6 mt-5 overflow-auto flex-1">
								{ items.map((item) => (
									<div key={ item.id } className="mb-2">
										{/* Отображение отдельного товара в корзине */ }
										<CartDrawerItem
											id={ item.id }
											imageUrl={ item.imageUrl }
											details={ getCartItemDetails(
												item.ingredients,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize,
											) }
											disabled={ item.disabled }
											name={ item.name }
											price={ item.price ?? 0 } // Защита от отсутствия цены
											quantity={ item.quantity }
											// Обработчик нажатий на кнопки увеличения/уменьшения количества товара
											onClickCountButton={ (type) =>
												onClickCountButton(item.id, item.quantity, type)
											}
											onClickRemove={ () => removeCartItem(item.id) } // Удаление товара
										/>
									</div>
								)) }
							</div>

							{/* Подвал корзины с итоговой суммой и кнопкой для оформления заказа */ }
							<SheetFooter className="-mx-6 bg-white p-8">
								<div className="w-full">
									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											Итого
											<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
										</span>

										{/* Отображение общей суммы товаров */ }
										<span className="font-bold text-lg">{ totalAmount } ₽</span>
									</div>

									{/* Кнопка оформления заказа с индикатором загрузки при перенаправлении */ }
									<Link href="/checkout">
										<Button
											onClick={ () => setRedirecting(true) }
											loading={ redirecting }
											type="submit"
											className="w-full h-12 text-base">
											Оформить заказ
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					) }
				</div>
			</SheetContent>
		</Sheet>
	);
};