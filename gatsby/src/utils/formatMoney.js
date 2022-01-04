const formatter = Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export default function formatMoney(paise) {
  return formatter.format(paise / 100);
}
