import { Outlet } from 'react-router'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '../Dashoboard/TopBar'

export const DashboardLayout = () => (
  <div className="flex min-h-screen bg-[#f8faf8] overflow-hidden">
    <Sidebar />
    <div className='flex flex-col flex-1 min-w-0 overflow-hidden'>
      <main className="flex-1 overflow-y-auto">
        <TopBar />
        <div className='max-w-5xl mx-auto p-4'>
          <Outlet />
        </div>
      </main>
    </div>
  </div>
)
