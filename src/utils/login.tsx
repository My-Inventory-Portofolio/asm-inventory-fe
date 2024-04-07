"use client"

import { Card } from "primereact/card"
import Image from "next/image"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { useState } from "react"
import { tryLogin } from "@/api/users"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    const res = await tryLogin({ username, password })
    const token = res.token
    const payloadBase64 = token.split(".")[1]
    const payload = JSON.parse(atob(payloadBase64))
    console.log(payload)
    if (payload) {
      Cookies.set("jwt", token)
      router.push("/inventory")
    }
  }

  return (
    <Card
      className="mx-auto my-auto shadow-8 border-round-3xl"
      style={{ height: "350px", width: "350px" }}
    >
      <div className="flex flex-column align-items-center">
        <Image
          src="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
          alt="ASM LOGO"
          width={70}
          height={70}
        />
        <div className="w-11 gap-3 flex flex-column mt-5">
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="username"
            onChange={(e) => setUsername(e?.target?.value)}
          />
          <InputText
            type="password"
            className="p-inputtext-sm"
            placeholder="password"
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <Button
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
