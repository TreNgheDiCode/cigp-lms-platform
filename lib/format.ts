export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
