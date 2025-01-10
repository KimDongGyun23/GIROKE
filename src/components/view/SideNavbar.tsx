import { useState } from 'react'

import { NavHomeIcon, NavNoteIcon, NavRecordIcon, NavTodoIcon } from './icons/NavIcon'

const NAV_LIST = [
  { label: '홈', Icon: NavHomeIcon },
  { label: '기록', Icon: NavRecordIcon },
  { label: '할일', Icon: NavTodoIcon },
  { label: '노트', Icon: NavNoteIcon },
] as const

type NavItemProps = {
  item: (typeof NAV_LIST)[number]
  isActive: boolean
  onClick: VoidFunction
}

const NavItem = ({ item, isActive, onClick }: NavItemProps) => {
  const itemStyle = isActive ? 'bg-black-100 text-black-600' : 'bg-black-600 text-black-100'

  return (
    <button className={`flex gap-4 rounded-xl px-4 py-3 ${itemStyle}`} onClick={onClick}>
      <div>
        <item.Icon active={isActive} />
      </div>
      <span className="translate-y-[1px] text-xl">{item.label}</span>
    </button>
  )
}

export const SideNavbar = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleChangeTab = (tab: number) => setActiveTab(tab)

  return (
    <nav className="flex-column col-span-1 h-full justify-center gap-4 rounded-xl bg-black-600 p-4 drop-shadow-sm">
      {NAV_LIST.map((item, index) => (
        <NavItem
          key={index}
          item={item}
          isActive={activeTab === index}
          onClick={() => handleChangeTab(index)}
        />
      ))}
    </nav>
  )
}
