import { Link } from 'react-router-dom'

import { useBoolean } from '@/hooks/useBoolean'
import { useDeleteTodo, useToggleTodoStatus } from '@/services/useHomeService'
import type { TodoItemType } from '@/types/home'

import { EmptyMessage } from '../view/ErrorMessage'
import { CheckBoxIcon, TrashIcon, WrenchIcon } from '../view/icons/ActiveIcon'
import { ModalDelete } from '../view/modal/Modal'

type TodoItemProps = {
  task: TodoItemType
}

export const TodoItem = ({ task }: TodoItemProps) => {
  const [isModalOpen, openModal, closeModal] = useBoolean(false)
  const { localTask, toggleTodoStatus, error: updateError } = useToggleTodoStatus(task)
  const { deleteTodo, error: deleteError } = useDeleteTodo()

  const { id, todo, isActive } = localTask

  const activeStyle = isActive
    ? 'bg-green-4 border-none text-white'
    : 'border border-grey-3 bg-white text-grey-7'

  const handleDeleteTodo = async () => {
    if (task) {
      await deleteTodo(task).then(() => {
        closeModal()
      })
    }
  }

  const error = updateError || deleteError

  if (error) return <EmptyMessage>{error?.message}</EmptyMessage>

  return (
    <>
      <div className={`flex-between-align p-medium rounded-lg px-[14px] py-3 ${activeStyle}`}>
        <p>{todo}</p>
        <div className="flex-align gap-2">
          <button onClick={toggleTodoStatus}>
            <CheckBoxIcon active={isActive} />
          </button>

          <Link to={`/home/edit/${id}`}>
            <WrenchIcon active={isActive} />
          </Link>

          <button onClick={openModal}>
            <TrashIcon active={isActive} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalDelete
          isOpen={isModalOpen}
          closeModal={closeModal}
          leftButtonOnClick={closeModal}
          rightButtonOnClick={handleDeleteTodo}
        />
      )}
    </>
  )
}
