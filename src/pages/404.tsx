import { AnchorButton } from '@/components/AnchorButton'
import { Home as HomeIcon } from '@/icons/Home'
import { SearchIcon } from '@/icons/SearchIcon'
export default function NotFoundPage () {
  return (
    <main className='min-h-[calc(100vh-80px)] h-full p-4'>
      <section className='py-10 flex flex-col items-center max-w-2xl mx-auto pt-30'>
        <h1 className="text-3xl font-bold text-green-pet px-3 py-1 rounded-lg border border-gray-100 shadow-sm shadow-gray-200 rotate-12 translate-y-0.5 bg-white">404</h1>
        <h1 className="text-3xl font-bold leading-none">Wow! We have lost</h1>
        <h1 className="text-3xl font-bold leading-none">our way</h1>
        <p className='mt-6 text-gray-600 text-lg text-center'>It seems that the page you are looking for went off to chase a squirrel and hasn't come back. Don't worry, you can go back to the beginning or search for your new best friend.</p>
        <div className="flex flex-col md:flex-row justify-center mt-10 max-w-sm gap-2 w-full">
          <AnchorButton href="/" className='flex-1 flex items-center gap-2 py-3'><span><HomeIcon className="w-3.5 h-3.5" /></span>Back to Home</AnchorButton>
          <div className='flex-1 bg-green-100 rounded-lg flex items-center py-1'>
            <span><SearchIcon className="mx-2 size-4 text-lime-600" /></span>
            <input type="text" placeholder='Search for pet' className='outline-none py-1 placeholder:text-lime-600 placeholder:font-bold'/>
          </div>
        </div>
      </section>
    </main>
  )
}
