const url = "https://yuta-inventory.vercel.app/api/pembelian"

export const getAllPembelian = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
