import toast from "react-hot-toast"

const url = "https://asm-inventory-be-phi.vercel.app/users/login"

// toast
const toastLoading = () =>
  toast("Loading...", {
    duration: 10000,
  })

const toastError = (msg: string) => {
  toast.remove()
  toast.error(msg)
}

// POST ASSET
export const tryLogin = async (data: any) => {
  try {
    toastLoading()

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      // toastError("Something when error, please login again")
      throw new Error("Network response was not ok")
    }
    return response.json()
  } catch (error) {
    toastError("Invalid username or password!")
  }
}
