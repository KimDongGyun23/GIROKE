import type { ComponentType } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  NavBookmarkIcon,
  NavHomeIcon,
  NavNoteIcon,
  NavProjectIcon,
  NavTermIcon,
} from './icons/NavIcon'

type NavIconProps = {
  active: boolean
}

type BottomNavItemType = {
  name: string
  Component: ComponentType<NavIconProps>
  url: string
}

const bottomNavList: BottomNavItemType[] = [
  { name: '용어정리', Component: NavTermIcon, url: '/term' },
  { name: '프로젝트', Component: NavProjectIcon, url: '/project' },
  { name: '홈', Component: NavHomeIcon, url: '/home' },
  { name: '노트', Component: NavNoteIcon, url: '/note' },
  { name: '북마크', Component: NavBookmarkIcon, url: '/bookmark' },
]

export const BottomNav = () => {
  const { pathname } = useLocation()
  const matchedNavUrl = bottomNavList.find((nav) => nav.url === pathname)
  if (!matchedNavUrl) return null

  return (
    <nav className="grid w-full grid-cols-5 px-4 pb-[19px] pt-[9px] shadow-lg">
      {bottomNavList.map(({ name, Component, url }) => {
        const isActive = matchedNavUrl.url === url
        const textStyle = isActive ? 'text-green-6' : 'text-grey-4'

        return (
          <Link key={name} to={url} className="flex-column-align gap-[10px]">
            <Component active={isActive} />
            <span className={`p-small font-medium ${textStyle}`}>{name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
