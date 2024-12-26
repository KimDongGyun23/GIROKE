import { useState } from 'react'

import { BookmarkNote } from '@/components/domain/BookmarkNote'
import { BookmarkTerm } from '@/components/domain/BookmarkTerm'

const TABS = ['용어 정리', '노트'] as const
type TabType = (typeof TABS)[number]

export const Bookmark = () => {
  const [currentTab, setCurrentTab] = useState<TabType>(TABS[0])

  const getTabStyle = (tab: TabType) =>
    currentTab === tab
      ? 'border-b-2 border-green-5 text-grey-7'
      : 'border-b border-grey-3 text-grey-3'

  const handleTabClick = (tab: TabType) => setCurrentTab(tab)

  return (
    <>
      <div className="flex-align px-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`button-medium grow py-3 text-center font-medium ${getTabStyle(tab)}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <main className="flex-column scroll mx-4">
        {currentTab === TABS[0] ? <BookmarkTerm /> : <BookmarkNote />}
      </main>
    </>
  )
}
