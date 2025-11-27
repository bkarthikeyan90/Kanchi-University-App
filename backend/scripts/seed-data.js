const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@kanchiuniv.ac.in',
      passwordHash: adminPassword,
      role: 'SUPERADMIN',
      isActive: true,
    },
  });
  console.log('✓ Admin user created');

  // Create departments
  const csDept = await prisma.department.upsert({
    where: { code: 'CS' },
    update: {},
    create: {
      name: 'Computer Science',
      code: 'CS',
      description: 'Department of Computer Science and Engineering',
      headName: 'Dr. John Doe',
      headEmail: 'head.cs@kanchiuniv.ac.in',
      headPhone: '+91-9876543210',
      isActive: true,
    },
  });

  const eceDept = await prisma.department.upsert({
    where: { code: 'ECE' },
    update: {},
    create: {
      name: 'Electronics and Communication Engineering',
      code: 'ECE',
      description: 'Department of Electronics and Communication Engineering',
      headName: 'Dr. Jane Smith',
      headEmail: 'head.ece@kanchiuniv.ac.in',
      headPhone: '+91-9876543211',
      isActive: true,
    },
  });
  console.log('✓ Departments created');

  // Create courses
  await prisma.course.upsert({
    where: {
      code_departmentId: {
        code: 'BCS',
        departmentId: csDept.id,
      },
    },
    update: {},
    create: {
      name: 'Bachelor of Computer Science',
      code: 'BCS',
      departmentId: csDept.id,
      level: 'UG',
      duration: '3 years',
      description: 'Undergraduate program in Computer Science',
      eligibility: '12th pass with Mathematics',
    },
  });

  await prisma.course.upsert({
    where: {
      code_departmentId: {
        code: 'MCS',
        departmentId: csDept.id,
      },
    },
    update: {},
    create: {
      name: 'Master of Computer Science',
      code: 'MCS',
      departmentId: csDept.id,
      level: 'PG',
      duration: '2 years',
      description: 'Postgraduate program in Computer Science',
      eligibility: 'Bachelor degree in Computer Science',
    },
  });
  console.log('✓ Courses created');

  // Create faculty
  await prisma.faculty.createMany({
    data: [
      {
        name: 'Dr. Alice Johnson',
        email: 'alice.johnson@kanchiuniv.ac.in',
        phone: '+91-9876543212',
        designation: 'Professor',
        departmentId: csDept.id,
        bio: 'Expert in Machine Learning and AI',
        qualifications: 'Ph.D. in Computer Science',
        researchAreas: 'Machine Learning, Deep Learning, NLP',
        isActive: true,
      },
      {
        name: 'Dr. Bob Williams',
        email: 'bob.williams@kanchiuniv.ac.in',
        phone: '+91-9876543213',
        designation: 'Associate Professor',
        departmentId: csDept.id,
        bio: 'Expert in Software Engineering',
        qualifications: 'Ph.D. in Software Engineering',
        researchAreas: 'Software Architecture, Cloud Computing',
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Faculty created');

  // Create news
  await prisma.news.createMany({
    data: [
      {
        title: 'Welcome to New Academic Year',
        content: 'We are pleased to welcome all students to the new academic year. Classes will begin on January 15, 2024.',
        category: 'General',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        views: 0,
      },
      {
        title: 'Research Paper Published',
        content: 'Dr. Alice Johnson has published a groundbreaking research paper in the field of Machine Learning.',
        category: 'Research',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        views: 0,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ News created');

  // Create events
  await prisma.event.createMany({
    data: [
      {
        title: 'Annual Technical Fest',
        description: 'Join us for our annual technical fest featuring competitions, workshops, and guest lectures.',
        startDate: new Date('2024-03-01T10:00:00Z'),
        endDate: new Date('2024-03-03T18:00:00Z'),
        location: 'Main Auditorium',
        category: 'Academic',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        views: 0,
      },
      {
        title: 'Career Guidance Workshop',
        description: 'Workshop on career opportunities and placement preparation.',
        startDate: new Date('2024-02-15T14:00:00Z'),
        location: 'Seminar Hall',
        category: 'Career',
        isPublished: true,
        publishedAt: new Date(),
        authorId: admin.id,
        views: 0,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Events created');

  // Create placements
  const placement = await prisma.placement.create({
    data: {
      companyName: 'Tech Solutions Inc.',
      description: 'Leading software development company',
      website: 'https://techsolutions.com',
      isActive: true,
    },
  });

  await prisma.placementStat.create({
    data: {
      placementId: placement.id,
      year: 2023,
      studentsPlaced: 25,
      averagePackage: '8 LPA',
      highestPackage: '15 LPA',
    },
  });
  console.log('✓ Placements created');

  // Create banners
  await prisma.banner.createMany({
    data: [
      {
        title: 'Welcome to Kanchi University',
        imageUrl: 'https://via.placeholder.com/800x400',
        linkUrl: '/',
        order: 1,
        isActive: true,
      },
      {
        title: 'Admissions Open',
        imageUrl: 'https://via.placeholder.com/800x400',
        linkUrl: '/admissions',
        order: 2,
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });
  console.log('✓ Banners created');

  console.log('\n✅ Database seeding completed!');
  console.log('\nLogin credentials:');
  console.log('Username: admin');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

