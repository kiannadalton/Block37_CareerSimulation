// add alll the functions
const prisma = require('./index')

// not using, but keeping just in case capstone requires it
// const createItem = (itemData) => {
//     return prisma.items.create({
//         data: itemData,
//     })
// };

const findAllItems = () => {
  return prisma.items.findMany({
    include:{
        reviews: true,
    }
  });
};

const findItembyId = (id) => {
    return prisma.items.findUnique({
      where: {id},
      include: {
        reviews: {include:{comments: true}},
      }
    });
};


module.exports = { findItembyId, findAllItems}