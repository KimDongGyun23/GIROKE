import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SearchIcon } from './icons/NonActiveIcon'

type SearchProps = {
  initialValue?: string | null
  tabName: string
}

export const Search = ({ initialValue, tabName }: SearchProps) => {
  const navigate = useNavigate()
  const [searchName, setSearchName] = useState(initialValue || '')
  const handleClickSearchButton = () => {
    navigate(`/${tabName}/search?searchName=${searchName}`)
  }

  return (
    <div className="p-regular flex-align gap-1 rounded-lg border border-grey-3 py-[10px] pl-4 pr-[10px]">
      <input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="flex-1 text-grey-7 placeholder:text-grey-4 focus:outline-none"
        placeholder="검색어를 입력해주세요."
      />
      <button type="button" onClick={handleClickSearchButton}>
        <SearchIcon />
      </button>
    </div>
  )
}
