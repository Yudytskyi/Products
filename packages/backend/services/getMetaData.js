const getMetaData = (count, limit, offset = 0) => {
  const meta = {};
  const countAllItems = Number(count);
  const countItemsOnPage = Number(limit);
  const numberFirstItemOnPage = Number(offset) + 1;

  meta.countAllItems = countAllItems;

  if (limit) {
    const currentPage = Math.ceil(numberFirstItemOnPage / countItemsOnPage);
    const totalPages = Math.ceil(countAllItems / countItemsOnPage);
    meta.countItemsOnPage =
      countAllItems - numberFirstItemOnPage + 1 > countItemsOnPage
        ? countItemsOnPage
        : countAllItems - numberFirstItemOnPage + 1;
    meta.page = String(`${currentPage} of ${totalPages}`);
    meta.numberFirstItemOnPage = numberFirstItemOnPage;
  }
  return meta;
};

module.exports = getMetaData;
