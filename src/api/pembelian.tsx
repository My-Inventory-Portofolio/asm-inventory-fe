import toast from "react-hot-toast"
import Cookies from "js-cookie"

const url = "https://asm-inventory-be-phi.vercel.app/api/pembelian" // prod
// const url = "http://localhost:8080/api/pembelian" // develop

const token = Cookies.get("jwt")
const role = Cookies.get("role")

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
    return `${imageUrl.data.foto}|${imageUrl.data.id}`
  } catch (error) {
    console.error("Error saat mengunggah gambar:", error)
    throw error
  }
}

async function deleteImage(id: string) {
  try {
    const response = await fetch(
      "https://storage-api.online/img/public/api/data/delete/" + id,
      {
        method: "DELETE",
      }
    )
  } catch (error) {
    toastError("Gagal delete image")
  }
}

export const deletePembelian = async (data: any) => {
  toastLoading()
  try {
    if (role === "admin") {
      const tryDeleteImage = await deleteImage(data.imgId)
    }
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ kode: data.kode }),
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

export const postPembelian = async (data: any) => {
  toastLoading()
  try {
    let imgStr = ""
    // handle upload image
    if (role === "admin") {
      const imageData = new FormData()
      imageData.append("data_id", data.kode)
      imageData.append("foto", data.file)
      const imageUrl = await uploadImage(imageData)
      if (imageUrl) {
        imgStr += imageUrl
      }
    } else {
      imgStr += "-"
    }

    // post
    let newPembelian = {
      ...data,
      nota: imgStr,
    }

    // delete unnecesarry properties
    delete newPembelian.file
    if (newPembelian.nota !== "") {
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
      toastError("gagal membuat data pembelian")
    }
  } catch (err) {
    return err
  }
}
