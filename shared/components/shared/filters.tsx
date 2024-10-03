'use client';

import React from 'react';
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '../../hooks';

interface Props {
	className?: string;
}

// Основной компонент фильтрации
export const Filters: React.FC<Props> = ({ className }) => {
	// Получаем список ингредиентов и статус загрузки через кастомный хук
	const { ingredients, loading } = useIngredients();

	// Инициализируем состояние фильтров через кастомный хук
	const filters = useFilters();

	// Применяем текущие фильтры к URL (или состоянию приложения)
	useQueryFilters(filters);

	// Подготовка данных для чекбоксов ингредиентов
	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

	// Обновление диапазона цен на основе изменений слайдера
	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0]);
		filters.setPrices('priceTo', prices[1]);
	};

	return (
		<div className={ className }>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Фильтр по типу теста */ }
			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizzaTypes"
				className="mb-5"
				onClickCheckbox={ filters.setPizzaTypes } // Обработчик изменения выбранного типа теста
				selected={ filters.pizzaTypes } // Выбранные типы теста
				items={ [
					{ text: 'Тонкое', value: '1' },
					{ text: 'Традиционное', value: '2' },
				] }
			/>

			{/* Фильтр по размеру пиццы */ }
			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mb-5"
				onClickCheckbox={ filters.setSizes } // Обработчик изменения выбранного размера
				selected={ filters.sizes } // Выбранные размеры
				items={ [
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				] }
			/>

			{/* Фильтр по цене */ }
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Цена от и до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={ 0 }
						max={ 1000 }
						value={ String(filters.prices.priceFrom) } // Текущее значение минимальной цены
						onChange={ (e) => filters.setPrices('priceFrom', Number(e.target.value)) } // Обновление минимальной цены
					/>
					<Input
						type="number"
						min={ 100 }
						max={ 1000 }
						placeholder="1000"
						value={ String(filters.prices.priceTo) } // Текущее значение максимальной цены
						onChange={ (e) => filters.setPrices('priceTo', Number(e.target.value)) } // Обновление максимальной цены
					/>
				</div>

				<RangeSlider
					min={ 0 }
					max={ 1000 }
					step={ 10 }
					value={ [filters.prices.priceFrom || 0, filters.prices.priceTo || 1000] } // Текущий диапазон цен
					onValueChange={ updatePrices } // Обработчик изменения цены слайдером
				/>
			</div>

			{/* Фильтр по ингредиентам */ }
			<CheckboxFiltersGroup
				title="Ингредиенты"
				name="ingredients"
				className="mt-5"
				limit={ 6 } // Ограничение на количество одновременно отображаемых элементов
				defaultItems={ items.slice(0, 6) } // Отображаем первые 6 элементов по умолчанию
				items={ items } // Все доступные ингредиенты
				loading={ loading } // Состояние загрузки данных ингредиентов
				onClickCheckbox={ filters.setSelectedIngredients } // Обработчик выбора ингредиентов
				selected={ filters.selectedIngredients } // Выбранные ингредиенты
			/>
		</div>
	);
};
