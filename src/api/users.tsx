const url = "https://asm-inventory-be.vercel.app/users/login"

// POST ASSET
export const tryLogin = async (data: any) => {
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
    return response.json()
  } catch (error) {
    console.log("error")
  }
}
