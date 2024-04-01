const url = "https://asm-inventory-be.vercel.app/api/kartu_stok"

export const getAllKartuStok = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
