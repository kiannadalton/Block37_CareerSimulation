const prisma = require("./index");

const createUser = (userData) => {
  return prisma.users.create({
    data: userData,
  });
};

const findUserByUsername = (username) => {
  return prisma.users.findUnique({
    where: { username },
  });
};

const findUserById = (id) => {
  return prisma.users.findUnique({
    where: { id: id },
    include: {
      reviews: true,
      comments: true,
    },
  })
};

module.exports = { createUser, findUserByUsername, findUserById };
