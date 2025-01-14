import { Route, Routes } from 'react-router-dom'

import { Record } from '../container/Record'
import { Todo } from '../container/Todo'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/record" element={<Record />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/note" element={<div />} />

      <Route path="*" element={<div />} />
    </Routes>
  )
}
