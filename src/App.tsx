import { Link } from 'react-router-dom'

import { LoginBar } from './components/view/LoginBar'
import { SideNavbar } from './components/view/SideNavbar'
import { TodoList } from './components/view/TodoList'

const App = () => {
  return (
    <div className="flex-column h-svh bg-black-100">
      <header>
        <h1 className="bg-white px-8 py-8 font-jalnan text-4xl text-black-600">
          <Link to={'/'}>기로케</Link>
        </h1>
      </header>

      <div className="grid grow grid-cols-6 gap-8 overflow-hidden p-8">
        <SideNavbar />
        <div className="col-span-4 flex gap-2 overflow-hidden rounded-xl bg-white p-4 drop-shadow-sm">
          {['해야할 일', '진행 중', '완료'].map((label) => (
            <TodoList key={label} label={label} />
          ))}
        </div>
        <LoginBar />
      </div>
    </div>
  )
}

export default App
