'use client';
import React, { useEffect } from 'react';
import {cn} from '@/lib/utils';
import {Title} from './title';
import {Input} from '../ui/input';
import {RangeSlider} from './range-slider';
import {CheckboxFiltersGroup} from './checkbox-filters-group';
import {useFilterIngredients} from '../../../hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter } from 'next/navigation';


interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom: number;
    priceTo: number;
}

export const Filters: React.FC<Props> = ({className}) => {
	const router = useRouter();
    const {ingredients, loading, onAddId, selectedIds} = useFilterIngredients();
    const [prices, setPrice] = React.useState<PriceProps>({priceFrom: 0, priceTo: 5000});

		const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
		const [pizzaTypes, { toggle: toggleTypes }] = useSet(new Set<string>([]));


    const items = ingredients.map((item) => (
        {
            value: String(item.id),
            text: item.name
        }
    ))

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        })
    }

		useEffect(() => {
			const filters = ({
				...prices,
				sizes: Array.from(sizes),
				pizzaTypes: Array.from(pizzaTypes),
				ingredients: Array.from(selectedIds),
			})

			const queryString = qs.stringify(filters, {arrayFormat: 'comma'});

			router.push(`?${queryString}`)
		},[prices, sizes, pizzaTypes, selectedIds, router])

    return (
        <div className={cn('', className)}>
            <Title text='Фильтрация' size='sm' className='mb-5 font-bold'/>
            {/* Верхние чекбоксы */}

            <CheckboxFiltersGroup
                title="Тип теста"
                name="pizzaTypes"
                className="mb-5"
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}
                loading={loading}
								onClickCheckbox={toggleTypes}
								selectedIds={pizzaTypes}
								/>

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
								onClickCheckbox={toggleSizes}
								selectedIds={sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
                loading={loading}

            />


            {/* Фильтр по цене */}
            <div className="mt-10 pb-7"> 
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(prices.priceFrom)}
                        onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                        value={String(prices.priceTo)}
                        onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[prices.priceFrom, prices.priceTo]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({priceFrom, priceTo})}
                />

            </div>

            <CheckboxFiltersGroup
                title={'Ингредиенты'}
                className='mt-5'
                limit={6}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selectedIds={selectedIds}
                name='ingredients'
            />

            {/* Фильтр по категориям */}
        </div>
    );
};
