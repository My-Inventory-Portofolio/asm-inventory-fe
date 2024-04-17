const url = "https://yuta-inventory.vercel.app/api/pembelian" // prod
// const url = "http://localhost:8080/api/pembelian" // develop

export const getAllDataPembelian = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
