import { Outlet } from 'react-router'
import { Sidebar } from '../Sidebar'
import { TopBar } from '../Dashboard/TopBar'
import { useState } from 'react'

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleMenu = () => setIsOpen(!isOpen)
  return (
    <div className="flex min-h-screen bg-[#f8faf8] overflow-hidden">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu}/>
      <div className='flex flex-col flex-1 min-w-0 overflow-hidden'>
        <main className="flex-1 overflow-y-auto">

          <TopBar toggleMenu={toggleMenu}/>

          <div className='max-w-5xl mx-auto p-4'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
