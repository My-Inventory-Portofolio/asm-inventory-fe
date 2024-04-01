"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// utils
import NavBar from "../utils/navbar"
import SideBar from "../utils/sidebar"

// components
import Assets from "./assets"
import Catatan from "./catatan"
import KartuStok from "./kartu_stok"
import Pembelian from "./pembelian"

import { useState } from "react"

const queryClient = new QueryClient()

export default function InventoryComp() {
  const [visible, setVisible] = useState(false)
  const [activeContent, setActiveContent] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{ backgroundColor: "#eff3f8", height: "100vh" }}
        className="flex justify-content-between flex-column p-5"
      >
        {/* NAVBAR  */}
        <div
          className="bg-white flex justify-content-start border-round-md"
          style={{ height: "10%" }}
        >
          <NavBar visible={visible} setVisible={setVisible} />
          {/* sidebar  */}
          <SideBar
            visible={visible}
            setVisible={setVisible}
            activeContent={activeContent}
            setActiveContent={setActiveContent}
          />
        </div>
        {/* CONTENT  */}
        <div
          style={{ height: "85%", width: "100%" }}
          className="bg-white border-round-md"
        >
          {activeContent === 0 ? (
            <Assets />
          ) : activeContent === 1 ? (
            <Pembelian />
          ) : activeContent === 2 ? (
            <Catatan />
          ) : activeContent === 3 ? (
            <KartuStok />
          ) : (
            <></>
          )}
        </div>
      </div>
    </QueryClientProvider>
  )
}
