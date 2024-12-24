import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { TermItem } from '@/components/domain/TermItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import type { TermItemType, TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

const mockTerms: TermItemType[] = [
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
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])

  const handleBackClick = () => navigate(-1)
  const handleTagClick = (tag: TermTagsType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={handleBackClick}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="term" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {TERM_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {mockTerms.map((term) => (
          <TermItem key={term.id} term={term} />
        ))}
      </section>
    </main>
  )
}
