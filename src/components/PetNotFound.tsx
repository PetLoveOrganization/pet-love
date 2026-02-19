import { PetLeg } from '@/icons/PetLeg'
import { SearchIcon } from '@/icons/SearchIcon'
import { AnchorButton } from './AnchorButton'

export function PetNotFound () {
  return (
    <div className="grow mt-15 flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">

      <div className="relative mb-8">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white shadow-xl overflow-hidden relative z-10">
          <img
            src="/cat.webp"
            alt="Cute cat"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute right-0 bottom-4 z-20 bg-green-400 p-3 rounded-2xl shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
          <SearchIcon className="text-white w-6 h-6" />
        </div>
        <div className="absolute inset-0 rounded-full border-12 border-green-400/20 -m-4 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
        O<span className="text-green-500">op</span>s! This
        <br />
        <span className="text-green-500 italic">furbaby</span> is not available.
      </h1>

      <p className="max-w-md text-slate-500 text-lg mb-10 leading-relaxed">
        We couldn't find the page you're looking for. It's possible this little friend
        has already found a forever home or the link is incorrect.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg justify-center">
        <AnchorButton href="/" className="gap-2 text-white font-normal">
          <PetLeg className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Return to main listing
        </AnchorButton>

        <div className='flex-1 bg-green-100 rounded-lg flex items-center'>
          <span><SearchIcon className="mx-2 size-4 text-lime-600" /></span>
          <input type="text" placeholder='Look for a pet' className='outline-none py-1 placeholder:text-lime-600 placeholder:font-bold'/>
        </div>
      </div>

      <p className="mt-12 text-xs text-slate-300 font-mono tracking-widest uppercase">
        Error Code: 404_PET_NOT_FOUND
      </p>
    </div>

  )
}
