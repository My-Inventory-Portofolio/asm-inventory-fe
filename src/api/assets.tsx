import toast from "react-hot-toast"
import Cookies from "js-cookie"

const url = "https://asm-inventory-be-phi.vercel.app/api/assets" // prod
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
export const getAllDataAssets = async () => {
  try {
    const res = await fetch(url).then((response) => response.json())
    return res
  } catch (error) {
    toastError(`err:${error}`)
  }
}

// POST ASSET
export const postAssets = async (data: any) => {
  toastLoading()
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    console.log(res, "ini res")

    if (!response.ok) {
      toastError(res.message)
    } else {
      toastSuccess(res.message)
    }
  } catch (error) {
    console.log(`err:${error}`)
  }
}

// DELETE ASSET
export const deleteAssets = async (data: any) => {
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

// EDT ASSET
export const editAssets = async (data: any) => {
  toastLoading()
  try {
    const response = await fetch(url, {
      method: "PUT",
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
