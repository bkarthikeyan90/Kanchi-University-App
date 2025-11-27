const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = process.argv[2] || 'admin';
  const email = process.argv[3] || 'admin@kanchiuniv.ac.in';
  const password = process.argv[4] || 'admin123';
  const role = process.argv[5] || 'SUPERADMIN';

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.adminUser.create({
      data: {
        username,
        email,
        passwordHash,
        role,
        isActive: true,
      },
    });

    console.log('Admin user created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('ID:', admin.id);
  } catch (error) {
    if (error.code === 'P2002') {
      console.error('Error: User with this username or email already exists');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

