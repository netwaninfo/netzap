// import { SignInForm } from './components/sign-in-form'
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <SignIn />
      {/* <SignInForm /> */}
    </div>
  )
}
