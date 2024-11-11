import { PizzaSize, PizzaType } from '@/shared/constants/pizza'; // Импорт типов размера и типа пиццы из констант
import React from 'react'; // Импорт React
import { Variant } from '../components/shared/group-variant'; // Импорт интерфейса для вариантов выбора (размер, тип теста)
import { useSet } from 'react-use'; // Импорт хука useSet для работы с множеством (Set)
import { ProductItem } from '@prisma/client'; // Импорт модели ProductItem из Prisma
import { getAvailablePizzaSizes } from '../lib';

// Интерфейс, описывающий возвращаемые данные из хука
interface ReturnProps {
	size: PizzaSize; // Текущий выбранный размер пиццы
	type: PizzaType; // Текущий выбранный тип теста
	selectedIngredients: Set<number>; // Множество выбранных ингредиентов
	availableSizes: Variant[]; // Список доступных размеров
	currentItemId?: number; // ID текущей вариации пиццы (если существует)
	setSize: (size: PizzaSize) => void; // Функция для установки размера пиццы
	setType: (type: PizzaType) => void; // Функция для установки типа теста
	addIngredient: (id: number) => void; // Функция для добавления или удаления ингредиента
}

// Хук для управления параметрами пиццы (размер, тип теста, ингредиенты)
export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {

	const [size, setSize] = React.useState<PizzaSize>(20);  // Состояние для размера пиццы, по умолчанию 20 см
	const [type, setType] = React.useState<PizzaType>(1);   // Состояние для типа теста, по умолчанию 1 (например, тонкое тесто)

	// Использование хука useSet для управления множеством выбранных ингредиентов
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

	// Получаем доступные размеры пиццы для выбранного типа теста
	const availableSizes = getAvailablePizzaSizes(type, items);

	// Получаем ID текущего варианта пиццы, основываясь на выбранном типе теста и размере
	const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

	// Следим за изменениями доступных размеров и выбранных параметров (тип теста, размер)
	React.useEffect(() => {
		// Проверяем, доступен ли выбранный размер для текущего типа теста
		const isAvailableSize = availableSizes?.find(
			(item) => Number(item.value) === size && !item.disabled,
		);

		// Если текущий размер недоступен, выбираем первый доступный
		const availableSize = availableSizes?.find((item) => !item.disabled);

		// Если текущий размер недоступен и есть доступный размер, меняем выбранный размер
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [availableSizes, size, type]); // Выполняется при изменении доступных размеров, размера или типа теста

	return {
		size, // Возвращаем текущее значение размера пиццы
		type, // Возвращаем текущее значение типа теста
		selectedIngredients, // Возвращаем множество выбранных ингредиентов
		availableSizes, // Возвращаем список доступных размеров пиццы
		currentItemId, // Возвращаем текущий ID вариации пиццы (или undefined, если нет)
		setSize, // Возвращаем функцию для изменения размера пиццы
		setType, // Возвращаем функцию для изменения типа теста
		addIngredient, // Возвращаем функцию для добавления/удаления ингредиентов
	};
};