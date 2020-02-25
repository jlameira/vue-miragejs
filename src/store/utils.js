export const filterBase = properties => {
  return ['beds', 'baths', 'rating'].reduce((acc, item) => {
    const all = properties.map(prop => prop[item]);
    const uniq = [...new Set(all)];
    acc[item] = uniq.sort();
    return acc;
  }, {});
};
