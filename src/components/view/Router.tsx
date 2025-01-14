import { Route, Routes } from 'react-router-dom'

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/record" element={<div />} />
      <Route path="/todo" element={<div />} />
      <Route path="/note" element={<div />} />

      <Route path="*" element={<div />} />
    </Routes>
  )
}
