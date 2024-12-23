import type { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'

import { BackArrowIcon, CloseIcon, KebabIcon } from './icons/NonActiveIcon'

type SubHeaderWithIconType = {
  title: string
  type: 'close' | 'kebab'
  onClickCancel?: VoidFunction
  onClickIcon: VoidFunction
}

type SubHeaderWithoutIconType = {
  title?: string
  type: 'edit' | 'complete' | 'null'
  onClickCancel?: VoidFunction
  onClickText?: VoidFunction
}

type IconTypeMap = {
  [key in 'close' | 'kebab']: ComponentType
}

const iconTypeMap: IconTypeMap = {
  close: CloseIcon,
  kebab: KebabIcon,
}

export const SubHeaderWithIcon = ({
  title,
  type,
  onClickCancel,
  onClickIcon,
}: SubHeaderWithIconType) => {
  const navigate = useNavigate()
  const IconComponent = iconTypeMap[type]
  const handleClickCancel = onClickCancel || (() => navigate(-1))

  return (
    <div className="flex-between-align relative py-4">
      <button type="button" onClick={handleClickCancel}>
        <BackArrowIcon />
      </button>

      <h6 className="absolute left-1/2 w-fit -translate-x-1/2 text-center font-bold text-green-7">
        {title}
      </h6>

      <button type="button" onClick={onClickIcon}>
        <IconComponent />
      </button>
    </div>
  )
}

export const SubHeaderWithoutIcon = ({
  title,
  type,
  onClickCancel,
  onClickText,
}: SubHeaderWithoutIconType) => {
  const navigate = useNavigate()
  const handleClickCancel = onClickCancel || (() => navigate(-1))

  return (
    <div className="flex-between-align relative py-4">
      <button type="button" onClick={handleClickCancel}>
        <BackArrowIcon />
      </button>

      <h6 className="absolute left-1/2 w-fit -translate-x-1/2 text-center font-bold text-green-7">
        {title}
      </h6>
      {type === 'null' ? (
        <span className="w-6" />
      ) : (
        <button type="button" onClick={onClickText}>
          <p className="p-medium pr-[2px] font-medium text-grey-4">
            {type === 'edit' ? '수정' : '완료'}
          </p>
        </button>
      )}
    </div>
  )
}
