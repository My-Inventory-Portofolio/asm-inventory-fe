const url = "https://asm-inventory-be.vercel.app/api/assets"

export const getAllDataAssets = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}
export const postAssets = async (data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
  } catch (error) {
    console.log("error")
  }
}
