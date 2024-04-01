const url = "https://asm-inventory-be.vercel.app/api/assets"

export const getAllDataAssets = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
