import { Button } from './Button'

export const LoginBar = () => {
  return (
    <div className="h-fit rounded-xl bg-white p-4 drop-shadow-sm">
      <h3 className="mb-5 text-center text-lg">이용하기</h3>
      <div className="flex-column gap-2">
        <Button size="md" className="hover-scale w-full">
          로그인
        </Button>
        <Button size="md" className="hover-scale w-full" secondary>
          회원가입
        </Button>
      </div>
    </div>
  )
}
