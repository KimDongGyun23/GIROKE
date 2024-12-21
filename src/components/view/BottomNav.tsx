import { Link } from 'react-router-dom'

import type { PageNavItemsType } from '@/types/common'

type BottomNavProps = {
  navItems: PageNavItemsType[]
  currentUrl: string
}

export const BottomNav = ({ navItems, currentUrl }: BottomNavProps) => {
  return (
    <nav className="grid w-full grid-cols-5 px-4 pb-[19px] pt-[9px] shadow-lg">
      {navItems.map(({ name, Component, url }) => {
        const isActive = currentUrl === url
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
