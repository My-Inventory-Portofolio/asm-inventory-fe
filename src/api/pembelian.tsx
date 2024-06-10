import toast from "react-hot-toast"
import Cookies from "js-cookie"

const url = "https://asm-inventory-be-phi.vercel.app/api/pembelian" // prod
// const url = "http://localhost:8080/api/pembelian" // develop

const token = Cookies.get("jwt")

// toast
const toastLoading = () =>
  toast("Loading...", {
    duration: 30000,
  })
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
  // handle add new form data
  const newFormData: any = new FormData()
  imageData.map((e: any) => newFormData.append("images", e))

  try {
    if (newFormData) {
      const response = await fetch(
        "https://firebase-upload-api.vercel.app/upload-multiple",
        {
          method: "POST",
          mode: "cors",
          body: newFormData,
        }
      )
      // Periksa status respons
      if (!response.ok) {
        throw new Error("Gagal mengunggah gambar")
      }
      // Ambil URL gambar dari respons
      const imageUrl = await response.json()
      return imageUrl
    }
  } catch (error) {
    toastError("gagal fetch image")
    console.error("Error saat mengunggah gambar:", error)
    throw error
  }
}

export const deletePembelian = async (data: any) => {
  toastLoading()
  try {
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
    if (data.role === "admin") {
      const imageUrl: any = await uploadImage(data.file)
      if (imageUrl) {
        imgStr += imageUrl.imageNames.join("|")
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
    delete newPembelian.role

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
