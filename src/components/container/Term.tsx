import { useState } from 'react'

import type { CSSubjectType, TermItemType } from '@/types/common'
import { CS_SUBJECT } from '@/utils/constants'

import { TermItem } from '../domain/TermItem'
import { PostAdditionButton } from '../view/PostAdditionButton'
import { Search } from '../view/Search'
import { Tag } from '../view/Tag'

const termArr: TermItemType[] = [
  {
    id: 0,
    term: 'DNS',
    tag: '네트워크',
    description:
      '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  },
  {
    id: 1,
    term: 'DNS',
    tag: '네트워크',
    description:
      '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  },
  {
    id: 2,
    term: 'DNS',
    tag: '네트워크',
    description:
      '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  },
  {
    id: 3,
    term: 'DNS',
    tag: '네트워크',
    description:
      '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  },
  {
    id: 4,
    term: 'DNS',
    tag: '네트워크',
    description:
      '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  },
  {
    id: 5,
    term: 'DNS',
    tag: '네트워크',
    description:
      '사용자에게 친숙한 도메인 이름을 컴퓨터가 네트워크에서 서로를 식별하는 데 사용하는 인터넷 프로토콜(IP) 주소로 변환하는 인터넷 표준 프로토콜의 구성 요소',
  },
]

export const Term = () => {
  const [activeSubject, setActiveSubject] = useState<CSSubjectType | '전체'>(CS_SUBJECT[0])

  return (
    <main className="flex-column mx-4 h-full">
      <Search onClickSearchButton={() => {}} />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {[...CS_SUBJECT, '전체' as const].map((subject: CSSubjectType) => (
          <Tag
            key={subject}
            secondary={activeSubject !== subject}
            onClick={() => setActiveSubject(subject)}
          >
            {subject}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {termArr.map((item) => (
          <TermItem key={item.id} item={item} />
        ))}
      </section>

      <PostAdditionButton to={'/term/create'} />
    </main>
  )
}
