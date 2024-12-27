export const TERM_TAGS = [
  '전체',
  '네트워크',
  '데이터베이스',
  '자료구조',
  '알고리즘',
  '운영체제',
  '컴퓨터구조',
] as const

export const PROJECT_TAGS = ['전체', '원따봉', '쌍따봉', '트리플따봉'] as const
export const NOTE_TAGS = ['전체', '강의', '공부', '프로젝트', 'CS'] as const

export const ERROR_MESSAGE = {
  fetch: '데이터를 가져오는데에 실패했습니다.',
  auth: '사용자가 인증되지 않았습니다.',
  create: '데이터 생성 중에 오류가 발생했습니다.',
  update: '데이터 업데이트에 실패했습니다.',
  delete: '데이터 삭제에 실패했습니다.',
  bookmark: '북마크 업데이트에 실패했습니다.',
  default: '예상치 못한 오류가 발생했습니다.',
}
