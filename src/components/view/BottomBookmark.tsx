import { BookmarkedIcon, NonBookmarkedIcon } from './icons/NonActiveIcon'
import { Button } from './Button'

type BottomBookmarkProps = {
  isActive: boolean
  onToggleBookmark: VoidFunction
}

export const BottomBookmark = ({ isActive, onToggleBookmark }: BottomBookmarkProps) => {
  return (
    <div className="flex-align w-full gap-4 px-4 pb-[22px] pt-3 shadow-lg">
      {isActive ? <BookmarkedIcon /> : <NonBookmarkedIcon />}
      <Button size="md" width="grow" onClick={onToggleBookmark}>
        {isActive ? '북마크 해제' : '북마크'}
      </Button>
    </div>
  )
}
