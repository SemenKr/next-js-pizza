'use client';
import { Ingredient, ProductItem } from '@prisma/client';
import { Button } from '../ui';
import { GroupVariants } from './group-variant';
import { Title } from './title';
import { cn } from '@/shared/components/shared/lib/utils';
import { PizzaImage } from './pizza-image';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants';
import { useEffect, useState } from 'react';
import { IngredientItem } from '.';
import { useSet } from 'react-use';
import { getPizzaDetails } from './lib';


interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	loading?: boolean;
	onSubmit: (itemId: number, ingredients: number[]) => void;
	className?: string;
}

/**
 * Форма выбора ПИЦЦЫ
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

	const [size, setSize] = useState<PizzaSize>(20)
	const [type, setType] = useState<PizzaType>(1)

	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));


	const { totalPrice, textDetails } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);

	const availablePizza = items.filter((item) => item.pizzaType === type);
	const availablePizzaSizes = pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !availablePizza.some((pizza) => Number(pizza.size) === Number(item.value)),
	}))

	useEffect(() => {
		const isAvailableSize = availablePizzaSizes.find((item) => Number(item.value) === size && !item.disabled);
		const availableSize = availablePizzaSizes?.find((item) => !item.disabled);
		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [size, availablePizzaSizes, type]);

	const handleClickAdd = () => {
		console.log({ availablePizzaSizes });
	}
	return (
		<div className={ cn(className, 'flex flex-1') }>
			<PizzaImage imageUrl={ imageUrl } size={ size } />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={ name } size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{ textDetails }</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={ availablePizzaSizes }
						value={ String(size) }
						onClick={ value => setSize(Number(value) as PizzaSize) }
					/>

					<GroupVariants
						items={ pizzaTypes }
						value={ String(type) }
						onClick={ (value) => setType(Number(value) as PizzaType) }
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-4">
						{ ingredients.map((ingredient) => (
							<IngredientItem
								key={ ingredient.id }
								name={ ingredient.name }
								price={ ingredient.price }
								imageUrl={ ingredient.imageUrl }
								onClick={ () => addIngredient(ingredient.id) }
								active={ selectedIngredients.has(ingredient.id) }
							/>
						)) }
					</div>
				</div>

				<Button
					loading={ loading }
					onClick={ handleClickAdd }
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Добавить в корзину за { totalPrice } ₽
				</Button>
			</div>
		</div>
	);
};
