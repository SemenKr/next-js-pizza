import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import React from 'react';

// Интерфейсы для хранения состояния цен и фильтров
interface PriceProps {
	priceFrom?: number; // Минимальная цена
	priceTo?: number;   // Максимальная цена
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string;    // Типы теста пиццы, закодированные как строка
	sizes: string;         // Размеры пиццы, закодированные как строка
	ingredients: string;   // Ингредиенты, закодированные как строка
}

// Интерфейс для хранения состояния всех фильтров
export interface Filters {
	sizes: Set<string>;                 // Набор выбранных размеров пиццы
	pizzaTypes: Set<string>;            // Набор выбранных типов теста
	selectedIngredients: Set<string>;   // Набор выбранных ингредиентов
	prices: PriceProps;                 // Цены (от и до)
}

// Интерфейс для возвращаемого значения хука
interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void; // Функция для обновления цен
	setPizzaTypes: (value: string) => void;                    // Функция для переключения типа теста
	setSizes: (value: string) => void;                         // Функция для переключения размера
	setSelectedIngredients: (value: string) => void;           // Функция для переключения ингредиента
}

// Основной хук для управления фильтрами
export const useFilters = (): ReturnProps => {
	// Получаем текущие параметры запроса из URL
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	// Управление состоянием выбранных ингредиентов с помощью useSet
	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		// Инициализируем набор из параметра запроса 'ingredients'
		new Set<string>(searchParams.get('ingredients')?.split(',')),
	);

	// Управление состоянием выбранных размеров пиццы
	const [sizes, { toggle: toggleSizes }] = useSet(
		// Инициализируем набор из параметра запроса 'sizes', если он существует
		new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
	);

	// Управление состоянием выбранных типов теста
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		// Инициализируем набор из параметра запроса 'pizzaTypes', если он существует
		new Set<string>(
			searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
		),
	);

	// Управление состоянием цен
	const [prices, setPrices] = React.useState<PriceProps>({
		// Инициализируем цены из параметров запроса 'priceFrom' и 'priceTo'
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	// Функция для обновления цен
	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Используем React.useMemo для мемоизации значений и функций
	return React.useMemo(
		() => ({
			sizes,                    // Состояние выбранных размеров
			pizzaTypes,               // Состояние выбранных типов теста
			selectedIngredients,      // Состояние выбранных ингредиентов
			prices,                   // Состояние цен
			setPrices: updatePrice,   // Функция для обновления цен
			setPizzaTypes: togglePizzaTypes, // Функция для переключения типа теста
			setSizes: toggleSizes,          // Функция для переключения размера
			setSelectedIngredients: toggleIngredients, // Функция для переключения ингредиента
		}),
		[sizes, pizzaTypes, selectedIngredients, prices, togglePizzaTypes, toggleSizes, toggleIngredients],
	);
};
