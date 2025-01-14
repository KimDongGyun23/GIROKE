import { Link } from 'react-router-dom'

import { LoginBar } from './components/view/LoginBar'
import { RouterComponent } from './components/view/Router'
import { SideNavbar } from './components/view/SideNavbar'

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
        <RouterComponent />
        <LoginBar />
      </div>
    </div>
  )
}

export default App
