export const limitArray = (array, limit) => {
  const result = [];
  for (let index = 0; index < limit; index++) {
    result.push(array[index]);
  }
  return result;
};
