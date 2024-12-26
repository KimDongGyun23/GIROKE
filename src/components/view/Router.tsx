import { Route, Routes } from 'react-router-dom'

import { ErrorPage } from '../container/auth/ErrorPage'
import { Login } from '../container/auth/Login'
import { Bookmark } from '../container/bookmark/Bookmark'
import { Home } from '../container/home/Home'
import { HomeCreate } from '../container/home/HomeCreate'
import { HomeEdit } from '../container/home/HomeEdit'
import { Note } from '../container/note/Note'
import { NoteCreate } from '../container/note/NoteCreate'
import { NoteDetail } from '../container/note/NoteDetail'
import { NoteEdit } from '../container/note/NoteEdit'
import { NoteSearch } from '../container/note/NoteSearch'
import { Project } from '../container/project/Project'
import { ProjectCreate } from '../container/project/ProjectCreate'
import { ProjectDetail } from '../container/project/ProjectDetail'
import { ProjectEdit } from '../container/project/ProjectEdit'
import { ProjectSearch } from '../container/project/ProjectSearch'
import { Term } from '../container/term/Term'
import { TermCreate } from '../container/term/TermCreate'
import { TermDetail } from '../container/term/TermDetail'
import { TermEdit } from '../container/term/TermEdit'
import { TermSearch } from '../container/term/TermSearch'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

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
      <Route path="/note/create" element={<NoteCreate />} />
      <Route path="/note/detail/:id" element={<NoteDetail />} />
      <Route path="/note/edit/:id" element={<NoteEdit />} />
      <Route path="/note/search" element={<NoteSearch />} />

      <Route path="/bookmark" element={<Bookmark />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
