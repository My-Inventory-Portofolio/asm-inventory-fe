import React from "react"
import { FileUpload } from "primereact/fileupload"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllCatatan } from "@/api/catatan"

export default function Catatan() {
  const queryClient = useQueryClient()

  // query
  const catatanData: any[] | undefined = queryClient.getQueryData(["catatan"])

  // Queries
  useQuery({
    queryKey: ["catatan"],
    queryFn: getAllCatatan,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  console.log(catatanData)

  return <div className="card">ini catatan</div>
}
