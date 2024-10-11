'use client'; // Указывает, что этот компонент будет выполняться на стороне клиента

import { Ingredient, ProductItem } from '@prisma/client'; // Импорт моделей ингредиентов и продуктов из Prisma
import { Button } from '../ui'; // Импорт кнопки из пользовательского интерфейса
import { GroupVariants } from './group-variant'; // Импорт компонента для отображения вариантов выбора (размер, тип теста)
import { Title } from './title'; // Импорт компонента для отображения заголовка
import { cn } from '@/shared/components/shared/lib/utils'; // Импорт функции для объединения классов CSS
import { PizzaImage } from './pizza-image'; // Импорт компонента для отображения изображения пиццы
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants'; // Импорт констант, связанных с пиццей
import { useEffect, useState } from 'react'; // Импорт хуков React
import { IngredientItem } from '.'; // Импорт компонента для отображения отдельного ингредиента
import { useSet } from 'react-use'; // Импорт хука для работы с Set
import { getPizzaDetails } from './lib'; // Импорт функции для получения деталей пиццы (цена, описание)
import { usePizzaOptions } from '@/shared/hooks'; // Импорт пользовательского хука для управления опциями выбора пиццы

// Описание пропсов компонента
interface Props {
	imageUrl: string; // URL изображения пиццы
	name: string; // Название пиццы
	ingredients: Ingredient[]; // Список доступных ингредиентов
	items: ProductItem[]; // Список вариаций пицц (размер, тип теста и цена)
	loading?: boolean; // Индикатор загрузки
	onSubmit: (itemId: number, ingredients: number[]) => void; // Функция, вызываемая при добавлении пиццы в корзину
	className?: string; // Дополнительный CSS-класс
}

/**
 * Компонент формы для выбора параметров ПИЦЦЫ (размер, тип теста, ингредиенты)
 */
export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className,
}) => {

	// Получаем состояние и функции для изменения выбранных параметров пиццы через хук usePizzaOptions
	const {
		size, // Выбранный размер пиццы
		type, // Выбранный тип теста пиццы
		selectedIngredients, // Выбранные ингредиенты
		availableSizes, // Доступные размеры для выбранного типа пиццы
		currentItemId, // ID текущей вариации пиццы
		setSize, // Функция для изменения размера
		setType, // Функция для изменения типа теста
		addIngredient, // Функция для добавления/удаления ингредиента
	} = usePizzaOptions(items);

	// Получаем общую стоимость и текстовое описание пиццы
	const { totalPrice, textDetails } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);

	// Функция, вызываемая при нажатии кнопки "Добавить в корзину"
	const handleClickAdd = () => {
		if (currentItemId) { // Проверяем, что есть текущий выбранный ID вариации пиццы
			onSubmit(currentItemId, Array.from(selectedIngredients)); // Передаем ID вариации и список выбранных ингредиентов
		}
	};

	return (
		<div className={ cn(className, 'flex flex-1') }>
			{/* Компонент для отображения изображения пиццы */ }
			<PizzaImage imageUrl={ imageUrl } size={ size } />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				{/* Заголовок пиццы */ }
				<Title text={ name } size="md" className="font-extrabold mb-1" />

				{/* Текстовое описание пиццы (размер, тип теста) */ }
				<p className="text-gray-400">{ textDetails }</p>

				<div className="flex flex-col gap-4 mt-5">
					{/* Компонент для выбора размера пиццы */ }
					<GroupVariants
						items={ availableSizes } // Доступные размеры
						value={ String(size) } // Текущий выбранный размер
						onClick={ value => setSize(Number(value) as PizzaSize) } // Изменение размера при клике
					/>

					{/* Компонент для выбора типа теста */ }
					<GroupVariants
						items={ pizzaTypes } // Доступные типы теста
						value={ String(type) } // Текущий выбранный тип теста
						onClick={ (value) => setType(Number(value) as PizzaType) } // Изменение типа теста при клике
					/>
				</div>

				{/* Секция выбора ингредиентов */ }
				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-4">
						{ ingredients.map((ingredient) => (
							// Отображаем каждый ингредиент
							<IngredientItem
								key={ ingredient.id }
								name={ ingredient.name } // Название ингредиента
								price={ ingredient.price } // Цена ингредиента
								imageUrl={ ingredient.imageUrl } // Изображение ингредиента
								onClick={ () => addIngredient(ingredient.id) } // Добавляем/удаляем ингредиент при клике
								active={ selectedIngredients.has(ingredient.id) } // Выделяем активные ингредиенты
							/>
						)) }
					</div>
				</div>

				{/* Кнопка для добавления пиццы в корзину */ }
				<Button
					loading={ loading } // Индикатор загрузки
					onClick={ handleClickAdd } // Обработчик клика
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за { totalPrice } ₽
				</Button>
			</div>
		</div>
	);
};