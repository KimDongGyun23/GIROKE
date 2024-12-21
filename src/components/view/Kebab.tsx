type KebabProps = {
  list: { label: string; onClick: VoidFunction }[]
  location: string
  redIndex?: number
}

export const Kebab = ({ list, location, redIndex }: KebabProps) => {
  return (
    <div
      className={`flex-column-align p-small absolute w-fit rounded bg-white px-3 py-[10px] text-center shadow-lg ${location}`}
    >
      {list.map(({ label, onClick }, index) => {
        const textStyle = redIndex === index ? 'text-error' : 'text-grey-7'
        return (
          <div key={index} className="w-full">
            <button type="button" className={textStyle} onClick={onClick}>
              {label}
            </button>
            {index < list.length - 1 && <hr className="my-2 h-px w-full bg-grey-2" />}
          </div>
        )
      })}
    </div>
  )
}
