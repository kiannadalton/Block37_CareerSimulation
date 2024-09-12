const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();
  // seed 3 users
  console.log("Creating users");
  const [user1, user2, user3] = await Promise.all(
    [...Array(3)].map(() => {
      return prisma.users.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password(),
        },
      });
    })
  );

  const users = await prisma.users.findMany();
  console.log("created users:", users);

  // seed 3 items
  console.log("Creating items");
  const [item1, item2, item3] = await Promise.all(
    [...Array(3)].map(() => {
      return prisma.items.create({
        data: {
          name: faker.commerce.product(),
          img_url: faker.image.urlLoremFlickr(),
          description: faker.commerce.productDescription(),
        },
      });
    })
  );

  const items = await prisma.items.findMany();
  console.log("created items:", items);

  // seed 3 reviews
  console.log("Creating reviews");
  //   can remove review1, review2, etc if you include the findMany
  const [review1, review2, review3] = await Promise.all(
    [...Array(3)].map((_, i) => {
      return prisma.reviews.create({
        data: {
          score: faker.number.float({ min: 1, max: 5 }),
          txt: faker.lorem.sentences({ min: 2, max: 5 }),
          user_id: users[i].id,
          item_id: items[i].id,
        },
      });
    })
  );

  const reviews = await prisma.reviews.findMany();
  console.log("created reviews:", reviews);

  // seed 3 comments
  console.log("Creating comments");
  const [comment1, comment2, comment3] = await Promise.all(
    // ( _, i) connects this to the users and reviews - review documentation for maps
    [...Array(3)].map((_, i) => {
      return prisma.comments.create({
        data: {
          comment: faker.lorem.sentences({ min: 1, max: 3 }),
          // add square brackets with an 'i' after users because it's an array
          author_id: users[i].id,
          review_id: reviews[i].id,
        },
      });
    })
  );

  const comments = await prisma.comments.findMany();
  console.log("created comments:", comments);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(`ERROR ${err}`);
    await prisma.$disconnect();
  });
