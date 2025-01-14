import { TodoList } from '../domain/TodoList'

export const Todo = () => {
  return (
    <div className="col-span-4 flex gap-2 overflow-hidden rounded-xl bg-white p-4 drop-shadow-sm">
      {['해야할 일', '진행 중', '완료'].map((label) => (
        <TodoList key={label} label={label} />
      ))}
    </div>
  )
}
