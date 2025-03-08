// import { faker } from '@faker-js/faker';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// function generateSlug(title: string) {
//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/ /g, '-') // Replace spaces with hyphens
//     .replace(/[^\w-]+/g, ''); // remove all non-word chars
// }

// async function main() {
//   // 1️⃣ Create Users and Get Their IDs
//   const users = Array.from({ length: 10 }).map(() => ({
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     bio: faker.lorem.sentence(),
//     avatar: faker.image.avatar(),
//   }));

//   const createdUsers = await Promise.all(
//     users.map((user) => prisma.user.create({ data: user })),
//   );

//   const userIds = createdUsers.map((user) => user.id);

//   // 2️⃣ Create Posts Using Correct authorId
//   const posts = Array.from({ length: 40 }).map(() => ({
//     title: faker.lorem.sentence(),
//     slug: generateSlug(faker.lorem.sentence()),
//     content: faker.lorem.paragraphs(3),
//     thumbnail: faker.image.avatar(),
//     authorId: faker.helpers.arrayElement(userIds), // ✅ FIXED
//     published: true,
//   }));

//   await Promise.all(
//     posts.map(
//       async (post) =>
//         await prisma.post.create({
//           data: {
//             ...post,
//             comments: {
//               createMany: {
//                 data: Array.from({ length: 20 }).map(() => ({
//                   content: faker.lorem.sentence(),
//                   authorId: faker.helpers.arrayElement(userIds), // ✅ FIXED
//                 })),
//               },
//             },
//           },
//         }),
//     ),
//   );

//   console.log('--------Data has been seeded-----------');
// }

// main()
//   .then(() => {
//     prisma.$disconnect();
//     process.exit(0);
//   })
//   .catch((err) => {
//     prisma.$disconnect();
//     console.error(err);
//     process.exit(1);
//   });

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // remove all non-word chars
}

async function main() {
  // 1️⃣ Create Users and Get Their IDs
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          bio: faker.lorem.sentence(),
          avatar: faker.image.avatar(),
        },
      }),
    ),
  );

  const userIds = users.map((user) => user.id);

  // 2️⃣ Create Posts and Get Their IDs
  const posts = await Promise.all(
    Array.from({ length: 40 }).map(() =>
      prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          slug: generateSlug(faker.lorem.sentence()),
          content: faker.lorem.paragraphs(3),
          thumbnail: faker.image.avatar(),
          authorId: faker.helpers.arrayElement(userIds), // ✅ Assign existing userId
          published: true,
        },
      }),
    ),
  );

  const postIds = posts.map((post) => post.id);

  // 3️⃣ Create Comments with valid postId and authorId
  await Promise.all(
    Array.from({ length: 100 }).map(() =>
      prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: faker.helpers.arrayElement(userIds), // ✅ Assign valid authorId
          postId: faker.helpers.arrayElement(postIds), // ✅ Assign valid postId
        },
      }),
    ),
  );

  console.log('--------Data has been seeded-----------');
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((err) => {
    prisma.$disconnect();
    console.error(err);
    process.exit(1);
  });
