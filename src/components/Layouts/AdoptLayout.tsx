import { Outlet } from 'react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/footer'

export const AdoptLayout = () => (
  <div className="text-[#0d1b0d] flex flex-col min-h-screen">
    <Header />
    <main className="grow">
      <Outlet />
    </main>
    <Footer />
  </div>
)
