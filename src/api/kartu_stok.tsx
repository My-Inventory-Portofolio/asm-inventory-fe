import toast from "react-hot-toast"

const url = "https://asm-inventory-be-phi.vercel.app/api/kartu_stok" // prod

const toastError = (msg: string) => {
  toast.remove()
  toast.error(msg)
}

export const getAllKartuStok = async () => {
  try {
    const res = await fetch(url).then((response) => response.json())
    return res
  } catch (error) {
    toastError(`err:${error}`)
  }
}
