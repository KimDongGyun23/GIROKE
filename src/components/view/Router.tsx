import { Route, Routes } from 'react-router-dom'

import { Home } from '../container/Home'
import { HomeCreate } from '../container/HomeCreate'
import { HomeEdit } from '../container/HomeEdit'
import { Term } from '../container/Term'
import { TermDetail } from '../container/TermDetail'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/create" element={<HomeCreate />} />
      <Route path="/home/edit/:id" element={<HomeEdit />} />

      <Route path="/project" element={<div />} />
      <Route path="/note" element={<div />} />

      <Route path="/term" element={<Term />} />
      <Route path="/term/detail/:id" element={<TermDetail />} />

      <Route path="/bookmark" element={<div />} />
    </Routes>
  )
}
