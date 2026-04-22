export const Query = {
  cv: (parent, {id}, {db} , info) => {
    return db.cvs.find((cv) => cv.id === id);
  },
  cvs: (parent, {}, {db}, info) => db.cvs, 
};
