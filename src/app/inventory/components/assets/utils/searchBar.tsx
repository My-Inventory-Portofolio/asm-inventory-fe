import { InputText } from "primereact/inputtext"

type TSearchBar = {
  keyword: string
  setKeyword: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBar({ keyword, setKeyword }: TSearchBar) {
  return (
    <InputText
      className="p-inputtext-sm mr-2"
      placeholder="search keyword"
      value={keyword}
      onChange={(e: any) => setKeyword(e?.target?.value)}
    />
  )
}
