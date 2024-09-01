import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function GET(request: NextRequest) { // типизация NextRequest

	const query = request.nextUrl.searchParams.get('query') || ''; // получаем параметр query из URL

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query,
				mode: 'insensitive',
			},
		},
		take: 5,
	});

	return NextResponse.json(products)

}