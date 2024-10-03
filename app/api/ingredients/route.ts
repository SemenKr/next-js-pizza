import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
	const ingredients = await prisma.ingredient.findMany(); // получаем список ингредиентов с базы данных

	return NextResponse.json(ingredients); // возвращаем список ингредиентов с помощью NextResponse

}