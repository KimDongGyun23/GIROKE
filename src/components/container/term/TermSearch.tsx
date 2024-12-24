import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { TermItem } from '@/components/domain/TermItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import type { TermItemType, TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

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

export const TermSearch = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchName = searchParams.get('searchName')
  const [activeSubject, setActiveSubject] = useState<TermTagsType>(TERM_TAGS[0])
  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={() => navigate(-1)}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="term" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {TERM_TAGS.map((subject: TermTagsType) => (
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
    </main>
  )
}
