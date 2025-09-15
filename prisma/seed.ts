import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('Seeding users...');
  
  // Fetch users from API
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await usersResponse.json();
  
  for (const user of users) {
    // Create Geo first (or find existing)
    let geoId;
    if (user.address?.geo) {
      const geo = await prisma.geo.upsert({
        where: { 
          lat_lng: {
            lat: user.address.geo.lat,
            lng: user.address.geo.lng,
          }
        },
        update: {},
        create: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng,
        },
      });
      geoId = geo.id;
    }

    // Create Address (or find existing)
    let addressId;
    if (user.address && geoId) {
      const address = await prisma.address.upsert({
        where: {
          street_suite_city: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
          }
        },
        update: {},
        create: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geoId: geoId,
        },
      });
      addressId = address.id;
    }

    // Create Company (or find existing)
    let companyId;
    if (user.company) {
      const company = await prisma.company.upsert({
        where: { name: user.company.name },
        update: {},
        create: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        },
      });
      companyId = company.id;
    }

    // Create User (or find existing)
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone || null,
        website: user.website || null,
        addressId: addressId || null,
        companyId: companyId || null,
      },
    });
  }

  console.log(`Seeded ${users.length} users`);
}

async function seedPosts() {
  console.log('Seeding posts...');
  
  // Fetch posts from API
  const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsResponse.json();

  for (const post of posts) {
    await prisma.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
      },
    });
  }

  console.log(`Seeded ${posts.length} posts`);
}

async function main() {
  try {
    console.log('Starting database seeding...');
    
    // Seed data (upsert will handle existing data)
    await seedUsers();
    await seedPosts();
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });