const url = "https://asm-inventory-be.vercel.app/api/catatan"

export const getAllCatatan = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
