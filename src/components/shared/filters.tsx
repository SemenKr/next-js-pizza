
import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Slider } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('',className)}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold'/>
			{/* Верхние чекбоксы */}
			<div className="flex flex-col gap-4">
				<FilterCheckbox text='Можно Собирать' value='1'/>
				<FilterCheckbox text='Новинки' value='2'/>
			</div>
      {/* Фильтр по цене */}
			<div className="mt-10 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
						defaultValue={0}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
        />
        
      </div>

			<CheckboxFiltersGroup 
			title={'Ингредиенты'} 
			className='mt-5'
			limit={3}
			defaultItems={[
				{ text: '20 см', value: '20' },
				{ text: '30 см', value: '30' },
				{ text: '40 см', value: '40' },
				{ text: '20 см', value: '20' },
				{ text: '30 см', value: '30' },
				{ text: '40 см', value: '40' },
				{ text: '20 см', value: '20' },
				{ text: '30 см', value: '30' },
				{ text: '40 см', value: '40' },
			]}
			items={[
				{ text: '20 см', value: '20' },
				{ text: '30 см', value: '30' },
				{ text: '40 см', value: '40' },
				{ text: '20 см', value: '20' },
				{ text: '30 см', value: '30' },
				{ text: '40 см', value: '40' },
				{ text: '20 см', value: '20' },
				{ text: '30 см', value: '30' },
				{ text: '40 см', value: '40' },
			]}				
			/>

			{/* Фильтр по категориям */}
		</div>
	);
};