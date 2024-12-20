import { BottomNav } from './components/BottomNav'

const App = () => {
  return (
    <div className="flex-center">
      <div className="scroll flex-column relative h-svh w-full min-w-[320px] max-w-[450px] border-x">
        <div className="grow"></div>
        <BottomNav />
      </div>
    </div>
  )
}

export default App
