import { Route, Routes } from 'react-router-dom'

import { Home } from '../container/Home'
import { HomeCreate } from '../container/HomeCreate'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/create" element={<HomeCreate />} />

      <Route path="/project" element={<div />} />
      <Route path="/note" element={<div />} />
      <Route path="/term" element={<div />} />
      <Route path="/bookmark" element={<div />} />
    </Routes>
  )
}
