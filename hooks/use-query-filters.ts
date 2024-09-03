import React from 'react';
import { Filters } from './use-filters'; // Импорт интерфейса Filters из хука use-filters
import qs from 'qs'; // Импорт библиотеки qs для работы с query string
import { useRouter } from 'next/navigation'; // Импорт useRouter из Next.js для навигации

// Хук для синхронизации фильтров с URL
export const useQueryFilters = (filters: Filters) => {
	// Используем ref для отслеживания монтирования компонента
	const isMounted = React.useRef(false);
	const router = useRouter(); // Получаем объект router для управления навигацией

	// Эффект для отслеживания изменений фильтров
	React.useEffect(() => {
		// Если компонент уже смонтирован, обновляем URL
		if (isMounted.current) {
			// Формируем объект с фильтрами, преобразуя Set в массивы
			const params = {
				...filters.prices, // Добавляем параметры цены (priceFrom и priceTo)
				pizzaTypes: Array.from(filters.pizzaTypes), // Преобразуем Set типов теста в массив
				sizes: Array.from(filters.sizes), // Преобразуем Set размеров в массив
				ingredients: Array.from(filters.selectedIngredients), // Преобразуем Set ингредиентов в массив
			};

			// Преобразуем объект с параметрами в query string
			const query = qs.stringify(params, {
				arrayFormat: 'comma', // Форматируем массивы как строки с запятыми
			});

			// Обновляем URL с новыми параметрами, предотвращая прокрутку вверх
			router.push(`?${query}`, {
				scroll: false, // Отключаем автоматическую прокрутку страницы
			});
		}

		// Помечаем, что компонент теперь смонтирован
		isMounted.current = true;
	}, [filters, router]); // Эффект зависит от изменений фильтров и router
};
