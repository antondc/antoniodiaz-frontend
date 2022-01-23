type SortableDataItem = {
  id: number;
  order: number;
};

export const sortArrayByIdAndOrder = <T extends Array<SortableDataItem>>({
  data,
  id,
  order,
}: {
  data: T;
  id: number;
  order: number;
}): T => {
  const itemOrigin = data.find((item) => item.id === id);
  const itemTarget = data.find((item) => item.order === order);
  // Moved to an upper order
  const up = itemOrigin.order < itemTarget.order;

  const swappedArray = data.map((item) => {
    // If is moved item, assign target order
    if (item.id === id) {
      return {
        ...item,
        order: itemTarget.order,
      };
      // If moving up, and item is between lower item and upper item, including target, decrease order by one
    } else if (up && item.order > itemOrigin.order && item.order <= itemTarget.order) {
      return {
        ...item,
        order: item.order - 1,
      };
      // If moving down, and item is between lower item and upper item, including target, decrease order by one
    } else if (!up && item.order < itemOrigin.order && item.order >= itemTarget.order) {
      return {
        ...item,
        order: item.order + 1,
      };
      // Default item, return it
    } else {
      return item;
    }
  });

  const sortedArray = swappedArray.sort((prevItem, nextItem) => prevItem.order - nextItem.order);

  return sortedArray as T;
};
