import toast from "react-hot-toast"
import Cookies from "js-cookie"

const url = "https://asm-inventory-be-phi.vercel.app/api/pembelian" // prod
// const url = "http://localhost:8080/api/pembelian" // develop

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

export const getAllDataPembelian = async () => {
  const res = await fetch(url).then((response) => response.json())
  return res
}

async function uploadImage(imageData: any) {
  try {
    // Lakukan pengiriman gambar ke API penyimpanan gambar
    const response = await fetch(
      "https://storage-api.online/img/public/api/data/add",
      {
        method: "POST",
        body: imageData,
      }
    )

    // Periksa status respons
    if (!response.ok) {
      throw new Error("Gagal mengunggah gambar")
    }

    // Ambil URL gambar dari respons
    const imageUrl = await response.json()
    return imageUrl.data.foto
  } catch (error) {
    console.error("Error saat mengunggah gambar:", error)
    throw error
  }
}

export const postPembelian = async (data: any) => {
  toastLoading()

  try {
    // upload gambar
    const imageData = new FormData()
    imageData.append("data_id", data.kode)
    imageData.append("foto", data.file)
    const imageUrl = await uploadImage(imageData)

    if (imageUrl) {
      try {
        let newPembelian = {
          ...data,
          nota: `${imageUrl}`,
          harga_beli: Number(data.harga_beli),
        }
        delete newPembelian.file
        if (newPembelian) {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(newPembelian),
          })
          const res = await response.json()
          if (!response.ok) {
            toastError(res.message)
          } else {
            toastSuccess(res.message)
          }
        } else {
          toastError("error while hit api")
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("gagal post image")
    }
  } catch (err) {
    return err
  }
}
