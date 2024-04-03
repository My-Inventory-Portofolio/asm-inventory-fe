const url = "https://asm-inventory-be.vercel.app/api/assets"

// GET ASSET
export const getAllDataAssets = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}

// POST ASSET
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

// DELETE ASSET
export const deleteAssets = async (data: any) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    alert("Berhasil delete data")
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
  } catch (error) {
    console.log("error")
  }
}
