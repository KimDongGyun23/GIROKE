import { AdditionIcon, TrashIcon } from './icons/NonActiveIcon'

const TodoItem = () => {
  return (
    <div className="flex-column hover-scale mx-4 min-h-20 rounded-lg border border-black-200 p-2">
      <p className="grow text-black-500">기로케 완성하기</p>
      <div className="flex-between-align">
        <span className="text-xs text-black-300">생성일: 25/01/11</span>
        <button type="button">
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}

type TodoListProps = {
  label: string
}

export const TodoList = ({ label }: TodoListProps) => {
  return (
    <div className="flex-column h-full grow rounded-lg border border-black-100">
      <div className="flex-between-align p-4">
        <h3 className="text-lg text-black-600">{label}</h3>
        <button className="transition-all hover:scale-110">
          <AdditionIcon />
        </button>
      </div>

      <div className="flex-column gap-3 overflow-y-scroll pb-4 pt-2 scrollbar-hide">
        {[...Array(8)].map((item, index) => (
          <TodoItem key={index} />
        ))}
      </div>
    </div>
  )
}
