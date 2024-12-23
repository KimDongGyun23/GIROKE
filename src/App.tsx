import { useLocation } from 'react-router-dom'

import { BottomNav } from './components/view/BottomNav'
import {
  NavBookmarkIcon,
  NavHomeIcon,
  NavNoteIcon,
  NavProjectIcon,
  NavTermIcon,
} from './components/view/icons/NavIcon'
import { RouterComponent } from './components/view/Router'
import type { PageNavItemsType } from './types/common'

const pageNavItems: PageNavItemsType[] = [
  { name: '용어정리', Component: NavTermIcon, url: '/term' },
  { name: '프로젝트', Component: NavProjectIcon, url: '/project' },
  { name: '홈', Component: NavHomeIcon, url: '/home' },
  { name: '노트', Component: NavNoteIcon, url: '/note' },
  { name: '북마크', Component: NavBookmarkIcon, url: '/bookmark' },
]

const App = () => {
  const { pathname } = useLocation()
  const matchedNavUrl = pageNavItems.find((nav) => nav.url === pathname)

  return (
    <div className="flex-center">
      <div className="scroll flex-column relative h-svh w-full min-w-[320px] max-w-[450px] border-x">
        {matchedNavUrl && <h1 className="px-4 py-6 font-bold text-green-6">기로케</h1>}
        <div className="scroll flex-column grow">
          <RouterComponent />
        </div>
        {matchedNavUrl && <BottomNav navItems={pageNavItems} currentUrl={matchedNavUrl.url} />}
      </div>
    </div>
  )
}

export default App
