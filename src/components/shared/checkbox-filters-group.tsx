'use client'
 
import React from 'react';
import { cn } from '@/lib/utils';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';

type Item = FilterChecboxProps;

interface Props {
	title: string;
	items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  selectedIds?: Set<string>;
  onClickCheckbox?: (value: string) => void;
  loading?: boolean;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
  items,
  defaultItems,
  limit = 3,
  searchInputPlaceholder = 'Поиск...',
  className,
  selectedIds,
  onClickCheckbox,
  loading,
  name,

 }) => {

	const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');



	const list = showAll ? items : defaultItems?.slice(0, limit);
	
  const filtredItems = items.filter((item) =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  );

	return (
		<div className={cn(className)}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
        <div className="mb-5">
          <Input
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item, index) => (
					<FilterCheckbox 
						key={index} 
						text={item.text} 
						value={item.value}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={(ids) => console.log(ids)}

					/>
				))}
			</div>

			{items.length > limit && (
				<div className={ showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button onClick={() => setShowAll(!showAll)} className='text-primary mt-3 '>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}

		</div>
	);
};