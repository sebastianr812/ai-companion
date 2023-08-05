const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'Famous People' },
                { name: 'Movies & TV' },
                { name: 'Musicians' },
                { name: 'Games' },
                { name: 'Animals' },
                { name: 'Philosophy' },
                { name: 'Scientists' },
            ]
        });
    } catch (e) {
        console.error('Error seeding the db', e);
    } finally {
        await db.$disconnect();
    }
}

main();