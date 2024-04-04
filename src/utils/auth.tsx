"use client"
import { useLayoutEffect } from "react"
import { redirect } from "next/navigation"
import Cookies from "js-cookie"

function Auth({ children }: any) {
  useLayoutEffect(() => {
    const isAuthenticated = Cookies.get("jwt")
    if (!isAuthenticated) {
      redirect("/")
    }
  }, [])

  return <>{children}</>
}

export default Auth
