"use client"

import { useLayoutEffect, useState } from "react"
import { redirect } from "next/navigation"
import Cookies from "js-cookie"
import { useQueryClient } from "@tanstack/react-query"

function Auth({ children }: any) {
  const queryClient = useQueryClient()
  const [authorized, setAuthorized] = useState(false)

  useLayoutEffect(() => {
    const isAuthenticated = Cookies.get("jwt")
    if (!isAuthenticated) {
      redirect("/")
    } else {
      const payloadBase64 = isAuthenticated.split(".")[1]
      const payload = JSON.parse(atob(payloadBase64))
      if (payload?.username && authorized === false) {
        queryClient.setQueryData(["users"], payload)
        Cookies.set("username", payload.username)
        setAuthorized(true)
      }
    }
  }, [])

  return <>{authorized && children}</>
}

export default Auth
