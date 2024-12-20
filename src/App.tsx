import { CheckBoxIcon } from './components/icons/ActiveIcon'

const App = () => {
  return (
    <div className="flex-center">
      <div className="scroll relative h-svh w-full min-w-[320px] max-w-[450px] border-x">
        <h1>app</h1>
        <CheckBoxIcon active />
        <CheckBoxIcon />
      </div>
    </div>
  )
}

export default App
