import { AdditionIcon } from './icons/NonActiveIcon'

type PostAdditionButtonProps = {
  onClick: VoidFunction
}

export const PostAdditionButton = ({ onClick }: PostAdditionButtonProps) => {
  return (
    <button
      type="button"
      className="flex-center absolute bottom-24 left-1/2 -translate-x-1/2 gap-1 rounded-2xl border border-green-3 bg-grey-1 py-2 pl-[10px] pr-4 drop-shadow-md"
      onClick={onClick}
    >
      <AdditionIcon />
      <p className="p-small font-medium text-grey-7">글쓰기</p>
    </button>
  )
}
