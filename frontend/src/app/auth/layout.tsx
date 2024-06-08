import { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <div className="px-5">{children}</div>
}

export default AuthLayout
