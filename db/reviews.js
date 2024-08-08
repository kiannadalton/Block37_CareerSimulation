const prisma = require("./index");

const createReview = (reviewData) => {
  return prisma.reviews.create({
    data: reviewData,
  });
};

const getAllReviews = (user_id) => {
  return prisma.reviews.findMany({
    where: { user_id },
  });
};

const getReviewById = (item_id) => {
  return prisma.reviews.findUnique({
    where: { item_id },
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
      where: { id: id },
    });
  }
  return;
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
