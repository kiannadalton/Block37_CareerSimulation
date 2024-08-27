const prisma = require("./index");

const getReviewById = (id) => {
  return prisma.reviews.findUnique({
    where: { id },
  });
};

const getReviewByUserId = (user_id) => {
  return prisma.reviews.findMany({
    where: { user_id },
  });
};

const getReviewByItemId = (item_id) => {
  return prisma.reviews.findMany({
    where: { item_id },
  });
};

const createReview = (reviewData) => {
  return prisma.reviews.create({
    data: reviewData,
  });
};

const updateReview = (id, reviewData) => {
  return prisma.reviews.update({
    where: { id },
    data: reviewData,
  });
};

const deleteReview = async (id) => {
  const review = await getReviewById(id);
  if (review) {
    return prisma.reviews.delete({
      where: { id },
    });
  }
  return;
};

module.exports = {
  getReviewById,
  getReviewByUserId,
  getReviewByItemId,
  updateReview,
  deleteReview,
  createReview,
};
