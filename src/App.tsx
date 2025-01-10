import { Link } from 'react-router-dom'

const NAV_ITEMS = ['홈', '기록', '해야할 일', '노트']

const App = () => {
  return (
    <div className="flex-column min-h-svh bg-black-100">
      <header>
        <h1 className="bg-white px-8 py-8 font-jalnan text-4xl text-black-600">
          <Link to={'/'}>기로케</Link>
        </h1>
      </header>

      <div className="grid grow grid-cols-6 gap-8 p-8">
        <div className="flex-column col-span-1 h-full justify-center gap-4 rounded-xl bg-black-600 p-4 drop-shadow-sm">
          {NAV_ITEMS.map((item) => (
            <div key={item} className="rounded-xl bg-black-100 px-4 py-3 text-xl text-black-600">
              {item}
            </div>
          ))}
        </div>
        <p className="col-span-4 rounded-xl bg-white p-4 drop-shadow-sm">d</p>
        <p className="col-span-1 rounded-xl bg-white p-4 drop-shadow-sm">d</p>
      </div>
    </div>
  )
}

export default App
