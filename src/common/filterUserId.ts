export default function filterUserId(item: any) {
  const { userId, ...itemWithoutUserId } = item;
  return itemWithoutUserId;
}
