'use client'
import { Ingredient } from '@prisma/client'; // Импортируем тип `Ingredient` из библиотеки `@prisma/client`, который представляет собой модель данных для ингредиента в базе данных.
import { Api } from '../services/api-client'; // Импортируем объект `Api`, который, вероятно, содержит методы для взаимодействия с API сервера.
import { useEffect, useState } from 'react'; // Импортируем хуки `useEffect` и `useState` из React, которые будем использовать для управления состоянием и побочными эффектами в компоненте.
import { useSet } from 'react-use';

type IngredientItem = {
	id: number;
	name: string;
}
interface ReturnProps {
	ingredients: IngredientItem[];
	loading: boolean; // Интерфейс `ReturnProps` определяет структуру данных, которую мы ожидаем возвращать. В данном случае это массив объектов типа `Ingredient`.
	selectedIds: Set<string>;
	onAddId: (id: string) => void;
}

export const useFilterIngredients = () => {
	// Создаем собственный хук `useIngredients`, который будет управлять состоянием ингредиентов и возвращать их вместе с состоянием загрузки.

	const [ingredients, setIngredients] = useState<Ingredient[]>([]); // Используем хук `useState` для управления состоянием массива ингредиентов. Изначально массив пустой.
	const [loading, setLoading] = useState(true); // Используем хук `useState` для управления состоянием загрузки. Изначально `loading` установлено в `true`.

	const [selectedIds, { toggle }] = useSet(new Set<string>([]));


	useEffect(() => {
		// Хук `useEffect` срабатывает при монтировании компонента и выполняет побочный эффект — загрузку данных.

		async function fetchIngredients() {
			// Определяем асинхронную функцию `fetchIngredients`, которая будет загружать ингредиенты из API.
			try {
				setLoading(true); // Устанавливаем состояние загрузки в `true` перед началом загрузки данных.
				const ingredients = await Api.ingredients.getAll(); // Делаем асинхронный запрос к API для получения всех ингредиентов.
				setIngredients(ingredients); // После успешного получения данных обновляем состояние `ingredients` с полученными данными.
			} catch (error) {
				console.log(error); // Если происходит ошибка, выводим ее в консоль для отладки.
			} finally {
				setLoading(false); // Независимо от результата (успех или ошибка), устанавливаем состояние загрузки в `false`.
			}
		}

		fetchIngredients(); // Вызываем функцию `fetchIngredients` для загрузки данных сразу после монтирования компонента.
	}, []); // Пустой массив зависимостей [] означает, что эффект выполнится только один раз при монтировании компонента.

	return {
		ingredients, // Возвращаем состояние `ingredients`, чтобы оно могло быть использовано в компонентах.
		loading, // Возвращаем состояние `loading`, чтобы компоненты могли управлять отображением в зависимости от того, загружаются данные или нет.
		onAddId: toggle, // Возвращает функцию `toggle`, позволяющую компонентам добавлять или удалять идентификаторы из набора `selectedIds`
		selectedIds //Возвращает набор `selectedIds` для отслеживания того, какие идентификаторы ингредиентов выбраны в данный момент.
	};
};
