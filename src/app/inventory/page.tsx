"use client"

import React, { useState } from "react"
import { Button } from "primereact/button"

// components
import Aset from "./component/aset"
import Pembelian from "./component/pembelian"
import Catatan from "./component/catatan"
import KartuStok from "./component/kartu_stok"

// utils
import SideBar from "./utils/sidebar"

export default function HeadlessDemo() {
  const [visible, setVisible] = useState(false)
  const [activeContent, setActiveContent] = useState(0)

  return (
    <div
      style={{ backgroundColor: "#eff3f8", height: "100vh" }}
      className="flex justify-content-between flex-column p-5"
    >
      {/* NAVBAR  */}
      <div
        className="bg-white flex justify-content-start border-round-md"
        style={{ height: "10%" }}
      >
        <div className="flex align-items-center pl-3">
          <Button
            size="small"
            icon="pi pi-bars"
            onClick={() => setVisible(!visible)}
          />
        </div>
        {/* sidebar  */}
        <SideBar
          visible={visible}
          setVisible={setVisible}
          setActiveContent={setActiveContent}
        />
      </div>
      {/* CONTENT  */}
      <div
        style={{ height: "85%", width: "100%" }}
        className="bg-white border-round-md"
      >
        {activeContent === 0 ? (
          <Aset />
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
  )
}
