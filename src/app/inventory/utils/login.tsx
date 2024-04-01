"use client"

import { Card } from "primereact/card"
import Image from "next/image"
import { InputText } from "primereact/inputtext"
import { useState } from "react"
import { Button } from "primereact/button"

export default function Login() {
  const [value, setValue] = useState("")

  return (
    <Card
      className="mx-auto my-auto shadow-8 border-round-3xl"
      style={{ height: "350px", width: "350px" }}
    >
      <div className="flex flex-column align-items-center">
        <Image
          src="https://erp.sampurna-group.com/assets/layout/images/logo-white.png"
          alt="Description of your image"
          width={70}
          height={70}
        />
        <div className="w-11 gap-3 flex flex-column mt-5">
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="username"
          />
          <InputText
            type="text"
            className="p-inputtext-sm"
            placeholder="password"
          />
          <Button label="Login" raised size="small" />
        </div>
      </div>
    </Card>
  )
}
