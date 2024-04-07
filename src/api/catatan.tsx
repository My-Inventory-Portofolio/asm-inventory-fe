const url = "https://yuta-inventory.vercel.app//api/catatan"

export const getAllCatatan = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
