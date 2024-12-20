import { SearchIcon } from './icons/NonActiveIcon'

type SearchProps = {
  onClickSearchButton: VoidFunction
}

export const Search = ({ onClickSearchButton }: SearchProps) => {
  return (
    <div className="p-regular flex-align gap-1 rounded-lg border border-grey-3 py-[10px] pl-4 pr-[10px]">
      <input
        className="flex-1 text-grey-7 placeholder:text-grey-4 focus:outline-none"
        placeholder="검색어를 입력해주세요."
      />
      <button type="button" onClick={onClickSearchButton}>
        <SearchIcon />
      </button>
    </div>
  )
}
