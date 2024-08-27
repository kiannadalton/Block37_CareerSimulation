const prisma = require("./index");

const createComment = (commentData) => {
  return prisma.comments.create({
    data: commentData,
  });
};

const getAllComments = (author_id) => {
  return prisma.comments.findMany({
    where: { author_id },
  });
};

const getCommentByReviewId = (review_id) => {
  return prisma.comments.findMany({
    where: { review_id },
  });
};

const getCommentById = (id) => {
  return prisma.comments.findMany({
    where: { id },
  });
};

const updateComment = (id, commentData) => {
  return prisma.comments.update({
    where: { id },
    data: commentData,
  });
};

const deleteComment = async (id) => {
  const comment = await getCommentById(id);
  if (comment) {
    return prisma.comments.delete({
      where: { id: id },
    });
  }
  return;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentByReviewId,
  getCommentById,
  updateComment,
  deleteComment,
};
