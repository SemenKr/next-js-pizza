import { prisma } from '@/prisma/prisma-client'; // Импорт Prisma клиента для взаимодействия с базой данных

// Интерфейс для описания возможных параметров поиска пицц
export interface GetSearchParams {
  query?: string; // Текстовый запрос для поиска
  sortBy?: string; // Поле для сортировки
  sizes?: string; // Строка с размерами, разделёнными запятой
  pizzaTypes?: string; // Строка с типами пицц, разделёнными запятой
  ingredients?: string; // Строка с идентификаторами ингредиентов, разделёнными запятой
  priceFrom?: string; // Минимальная цена
  priceTo?: string; // Максимальная цена
}

// Константы для значений цены по умолчанию
const DEFAULT_MIN_PRICE = 0; // Минимальная цена по умолчанию
const DEFAULT_MAX_PRICE = 1000; // Максимальная цена по умолчанию

// Функция для поиска пицц по указанным параметрам
export const findPizzas = async (params: GetSearchParams) => {
  // Преобразуем строковые параметры размеров в массив чисел
  const sizes = params.sizes?.split(',').map(Number); 
  // Преобразуем строковые параметры типов пицц в массив чисел
  const pizzaTypes = params.pizzaTypes?.split(',').map(Number); 
  // Преобразуем строковые параметры ингредиентов в массив чисел
  const ingredientsIdArr = params.ingredients?.split(',').map(Number);

  // Устанавливаем минимальную и максимальную цену (или значения по умолчанию)
  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE; 
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  // Выполняем запрос к базе данных для поиска категорий с продуктами
  const categories = await prisma.category.findMany({
    include: {
      // Включаем продукты, принадлежащие категориям
      products: {
        // Сортируем продукты по убыванию их ID
        orderBy: {
          id: 'asc',
        },
        // Указываем условия для фильтрации продуктов
        where: {
          // Фильтруем по наличию указанных ингредиентов, если они есть
          ingredients: ingredientsIdArr
            ? {
                some: { // Условие: продукт должен содержать хотя бы один из указанных ингредиентов
                  id: {
                    in: ingredientsIdArr, // ID ингредиентов должен быть в указанном массиве
                  },
                },
              }
            : undefined, // Если ингредиенты не указаны, фильтр пропускаем
          items: { // Проверяем элементы продуктов (размеры, типы, цены)
            some: { // Условие: должен быть хотя бы один элемент, который соответствует фильтру
              size: {
                in: sizes, // Размер должен быть в массиве размеров
              },
              pizzaType: {
                in: pizzaTypes, // Тип пиццы должен быть в массиве типов
              },
              price: {
                gte: minPrice, // Цена должна быть >= минимальной
                lte: maxPrice, // Цена должна быть <= максимальной
              },
            },
          },
        },
        // Включаем дополнительные данные о продукте
        include: {
          ingredients: true, // Включаем информацию об ингредиентах
          items: { // Включаем элементы продуктов
            where: { // Фильтруем элементы по цене
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            // Сортируем элементы по возрастанию цены
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  // Возвращаем отфильтрованные категории
  return categories;
};
