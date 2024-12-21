import { CheckBoxIcon, TrashIcon, WrenchIcon } from '../view/icons/ActiveIcon'

type TodoItemProps = {
  todo: string
  isActive: boolean
}

export const TodoItem = ({ todo, isActive }: TodoItemProps) => {
  const activeStyle = isActive
    ? 'bg-green-4 border-none text-white'
    : 'border border-grey-3 bg-white text-black'

  return (
    <div className={`flex-between-align p-small rounded-lg px-[14px] py-3 ${activeStyle}`}>
      <p>{todo}</p>
      <div className="flex-align gap-2">
        <button>
          <CheckBoxIcon active={isActive} />
        </button>
        <button>
          <WrenchIcon active={isActive} />
        </button>
        <button>
          <TrashIcon active={isActive} />
        </button>
      </div>
    </div>
  )
}
