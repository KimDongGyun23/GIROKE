import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { NavHomeIcon, NavNoteIcon, NavRecordIcon, NavTodoIcon } from './icons/NavIcon'

const NAV_LIST = [
  { label: '홈', Icon: NavHomeIcon, url: '/' },
  { label: '기록', Icon: NavRecordIcon, url: '/record' },
  { label: '할일', Icon: NavTodoIcon, url: '/todo' },
  { label: '노트', Icon: NavNoteIcon, url: '/note' },
] as const

type NavItemProps = {
  item: (typeof NAV_LIST)[number]
  isActive: boolean
}

const NavItem = React.memo(({ item, isActive }: NavItemProps) => {
  const itemStyle = isActive ? 'bg-black-100 text-black-600' : 'bg-black-600 text-black-100'

  return (
    <Link to={item.url} className={`flex gap-4 rounded-xl px-4 py-3 ${itemStyle}`}>
      <div>
        <item.Icon active={isActive} />
      </div>
      <span className="translate-y-[1px] text-xl">{item.label}</span>
    </Link>
  )
})

export const SideNavbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="col-span-1 flex h-full flex-col justify-center gap-4 rounded-xl bg-black-600 p-4 drop-shadow-sm">
      {NAV_LIST.map((item) => (
        <NavItem key={item.url} item={item} isActive={item.url === pathname} />
      ))}
    </nav>
  )
}
