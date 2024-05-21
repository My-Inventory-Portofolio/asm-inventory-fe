import toast from "react-hot-toast"
import Cookies from "js-cookie"

const url = "https://asm-inventory-be-phi.vercel.app/api/keluhan" // prod
const token = Cookies.get("jwt")

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

// GET ASSET
export const getAllDataKeluhan = async () => {
  try {
    const res = await fetch(url).then((response) => response.json())
    return res
  } catch (error) {
    toastError(`err:${error}`)
  }
}

// DELETE ASSET
export const deleteKeluhan = async (data: any) => {
  toastLoading()
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (!response.ok) {
      toastError(res.message)
    } else {
      toastSuccess(res.message)
    }
  } catch (error) {
    console.log("error")
  }
}
