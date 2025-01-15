import { Link } from 'react-router-dom'

import { CreationBox } from './components/domain/CreationBox'
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
        <div className="col-span-4 flex gap-2 overflow-x-hidden overflow-y-scroll rounded-xl bg-white p-4 drop-shadow-sm scrollbar-hide">
          <RouterComponent />
        </div>

        <div className="flex-column col-span-1 gap-4">
          <LoginBar />
          <CreationBox />
        </div>
      </div>
    </div>
  )
}

export default App
