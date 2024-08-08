const prisma = require("./index");

const createComment = (commentData) => {
  return prisma.comments.create({
    data: commentData,
  });
};

const getAllComments = (user_id) => {
  return prisma.comments.findMany({
    where: { user_id },
  });
};

const getCommentById = (id) => {
  return prisma.comments.findUnique({
    where: { id: id },
  });
};

const updateComment = (id, commentData) => {
  return prisma.comments.update({
    where: { id: id },
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
  getCommentById,
  updateComment,
  deleteComment,
};
