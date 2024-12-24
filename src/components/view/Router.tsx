import { Route, Routes } from 'react-router-dom'

import { Home } from '../container/Home'
import { HomeCreate } from '../container/HomeCreate'
import { HomeEdit } from '../container/HomeEdit'
import { Project } from '../container/Project'
import { ProjectDetail } from '../container/ProjectDetail'
import { Term } from '../container/Term'
import { TermCreate } from '../container/TermCreate'
import { TermDetail } from '../container/TermDetail'
import { TermEdit } from '../container/TermEdit'
import { TermSearch } from '../container/TermSearch'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/create" element={<HomeCreate />} />
      <Route path="/home/edit/:id" element={<HomeEdit />} />

      <Route path="/note" element={<div />} />

      <Route path="/term" element={<Term />} />
      <Route path="/term/create" element={<TermCreate />} />
      <Route path="/term/search" element={<TermSearch />} />
      <Route path="/term/detail/:id" element={<TermDetail />} />
      <Route path="/term/edit/:id" element={<TermEdit />} />

      <Route path="/project" element={<Project />} />
      <Route path="/project/detail/:id" element={<ProjectDetail />} />

      <Route path="/bookmark" element={<div />} />
    </Routes>
  )
}
