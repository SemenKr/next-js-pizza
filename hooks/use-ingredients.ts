import { Api } from '../services/api-client'; // Импорт клиента API для работы с сервером
import { Ingredient } from '@prisma/client'; // Импорт типа Ingredient, получаемого из Prisma
import React from 'react'; // Импорт React

// Хук для загрузки и управления состоянием ингредиентов
export const useIngredients = () => {
	// Состояние для хранения списка ингредиентов
	const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
	// Состояние для управления статусом загрузки
	const [loading, setLoading] = React.useState(true);

	// Эффект, выполняющийся при монтировании компонента
	React.useEffect(() => {
		// Асинхронная функция для получения ингредиентов с сервера
		async function fetchIngredients() {
			try {
				setLoading(true); // Устанавливаем состояние загрузки в true перед началом запроса
				const ingredients = await Api.ingredients.getAll(); // Запрос на получение всех ингредиентов
				setIngredients(ingredients); // Сохраняем полученные ингредиенты в состояние
			} catch (error) {
				console.log(error); // Логируем ошибку в случае неудачи
			} finally {
				setLoading(false); // Устанавливаем состояние загрузки в false по завершении запроса
			}
		}

		// Вызываем функцию для загрузки ингредиентов
		fetchIngredients();
	}, []); // Зависимость - пустой массив, что означает, что эффект выполнится только при монтировании компонента

	// Возвращаем из хука массив ингредиентов и статус загрузки
	return {
		ingredients, // Список загруженных ингредиентов
		loading,     // Статус загрузки (true - идет загрузка, false - загрузка завершена)
	};
};
