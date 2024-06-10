"use client"

import { Card } from "primereact/card"
import Image from "next/image"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useState } from "react"
import { tryLogin } from "@/api/users"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import "../styles/index.module.css"

// component
export default function Login() {
  const [username, setUsername] = useState("") // username
  const [password, setPassword] = useState("") // password
  const router = useRouter()

  // FUNCTION HANDLE SUBMIT LOGIN
  const handleSubmit = async () => {
    // HASIL DARI LOGIN//
    const res = await tryLogin({ username, password })

    // jika benar, maka
    if (res) {
      const token = res.token
      const payloadBase64 = token.split(".")[1]
      const payload = JSON.parse(atob(payloadBase64))
      console.log(payload)
      if (payload) {
        // cookies set
        Cookies.set("jwt", token)

        // redirect
        router.push("/inventory")
      }
    }
  }

  return (
    <Card
      className="shadow-8 border-round-3xl boxed-content"
      style={{
        height: "350px",
        width: "350px",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex flex-column align-items-center img-wrap">
        <Image
          src="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
          alt="ASM LOGO"
          width={70}
          height={70}
        />
        <div className="w-11 gap-3 flex flex-column mt-5">
          {/* USERNAME  */}
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="username"
            onChange={(e) => setUsername(e?.target?.value)}
          />

          {/* PASSWORD  */}
          <InputText
            type="password"
            className="p-inputtext-sm"
            placeholder="password"
            onChange={(e) => setPassword(e?.target?.value)}
          />

          {/* BUTTON SUBMIT  */}
          <Button
            className="bg-gray-700 border-none"
            label="Login"
            raised
            size="small"
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </Card>
  )
}
