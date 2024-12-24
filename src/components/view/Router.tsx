import { Route, Routes } from 'react-router-dom'

import { Home } from '../container/Home'
import { HomeCreate } from '../container/HomeCreate'
import { HomeEdit } from '../container/HomeEdit'
import { Note } from '../container/Note'
import { NoteDetail } from '../container/NoteDetail'
import { Project } from '../container/Project'
import { ProjectCreate } from '../container/ProjectCreate'
import { ProjectDetail } from '../container/ProjectDetail'
import { ProjectEdit } from '../container/ProjectEdit'
import { ProjectSearch } from '../container/ProjectSearch'
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

      <Route path="/term" element={<Term />} />
      <Route path="/term/create" element={<TermCreate />} />
      <Route path="/term/search" element={<TermSearch />} />
      <Route path="/term/detail/:id" element={<TermDetail />} />
      <Route path="/term/edit/:id" element={<TermEdit />} />

      <Route path="/project" element={<Project />} />
      <Route path="/project/create" element={<ProjectCreate />} />
      <Route path="/project/detail/:id" element={<ProjectDetail />} />
      <Route path="/project/edit/:id" element={<ProjectEdit />} />
      <Route path="/project/search" element={<ProjectSearch />} />

      <Route path="/note" element={<Note />} />
      <Route path="/note/detail/:id" element={<NoteDetail />} />

      <Route path="/bookmark" element={<div />} />
    </Routes>
  )
}
