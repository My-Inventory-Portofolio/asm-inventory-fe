import toast from "react-hot-toast"

const url = "https://asm-inventory-be-phi.vercel.app/users/login"

// toast
const toastLoading = () => toast("Loading...")
const toastError = (msg: string) => {
  toast.remove()
  toast.error(msg)
}
const toastSuccess = (msg: string) => {
  toast.remove()
  toast.success(msg)
}

// POST ASSET
export const tryLogin = async (data: any) => {
  toastLoading()
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
