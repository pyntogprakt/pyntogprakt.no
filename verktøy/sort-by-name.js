/**
 * Takes a collection and returns it back in alphabetical order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
module.exports = (collection) =>
  collection.sort((a, b) =>
    Number(a.data.navn) - Number(b.data.navn),
  );
