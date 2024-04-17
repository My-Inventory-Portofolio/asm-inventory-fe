export default function formatRupiah(number: number) {
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number)
  return formattedNumber.slice(2, -3)
}
