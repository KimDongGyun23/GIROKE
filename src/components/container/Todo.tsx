import { TodoList } from '../domain/TodoList'

export const Todo = () => {
  return (
    <>
      {['해야할 일', '진행 중', '완료'].map((label) => (
        <TodoList key={label} label={label} />
      ))}
    </>
  )
}
