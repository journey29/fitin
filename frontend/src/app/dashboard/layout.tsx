import { PropsWithChildren } from "react"

import { MobileSidebar } from "./_components/MobileSidebar"
import { Sidebar } from "./_components/Sidebar"

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen md:items-stretch">
      <div className="hidden w-full sm:flex sm:max-w-[250px] md:max-w-[300px]">
        <Sidebar />
      </div>
      <div className="fixed left-5 top-5 sm:hidden">
        <MobileSidebar />
      </div>
      <div className="flex-1 pb-2">{children}</div>
    </div>
  )
}

export default DashboardLayout
