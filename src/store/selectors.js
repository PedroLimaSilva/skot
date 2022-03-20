export const getFile = (store) => {
  console.log('getFile says', store.file);
  return store.file;
};

// export const getStatementById = (store, id) =>
//   getStatements(store).find((statement) => statement.id === id) ||
//   getStatementById(getStatements(store), id);
