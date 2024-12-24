import { useState } from 'react'

const TABS = ['용어 정리', '노트'] as const

export const BookmarkTab = () => {
  const [currentTab, setCurrentTab] = useState<(typeof TABS)[number]>(TABS[0])

  return (
    <div className="flex-align px-4">
      {TABS.map((tab) => {
        const tabStyle =
          currentTab === tab
            ? 'border-b-2 border-green-5 text-grey-7'
            : 'border-b border-grey-3 text-grey-3'
        return (
          <button
            key={tab}
            className={`button-medium grow py-3 text-center font-medium ${tabStyle}`}
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
