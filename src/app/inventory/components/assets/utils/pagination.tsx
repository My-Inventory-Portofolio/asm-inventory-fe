import { Paginator } from "primereact/paginator"

type TPage = {
  first: number
  rows: number
}

type TPaginationProps = {
  dataLength: number | undefined
  first: number
  rows: number
  setFirst: React.Dispatch<React.SetStateAction<number>>
  setRows: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({
  dataLength,
  first,
  rows,
  setFirst,
  setRows,
}: TPaginationProps) {
  const onPageChange = ({ first, rows }: TPage) => {
    setFirst(first)
    setRows(rows)
  }

  return (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={dataLength}
      rowsPerPageOptions={[10, 20, 30]}
      onPageChange={onPageChange}
    />
  )
}
