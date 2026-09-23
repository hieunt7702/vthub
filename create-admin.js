const { PrismaClient } = require('./packages/database/node_modules/@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: { password: '123456', role: 'ADMIN' },
    create: { email: 'admin@gmail.com', password: '123456', role: 'ADMIN', name: 'Admin' }
  });
  console.log('Admin created');
}
main().catch(console.error).finally(() => prisma.$disconnect());
