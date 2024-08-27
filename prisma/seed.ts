import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt'

async function up() {

	await prisma.user.createMany({
		data: [
			{
				fullName: 'admin',
				email: 'admin@localhost',
				password: 'admin',
				role: 'ADMIN',
				verified: new Date()
			},
			{
				fullName: 'user',
				email: 'user@localhost',
				password: '234235235 ',
				role: 'USER',
				verified: new Date()
			},
		]
	})

}
async function down() {

}

async function main() {

	try {
		await down();
		await up();
	} catch (error) {
		console.log(error);
	}
}