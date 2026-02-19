import { PetLeg } from '@/icons/PetLeg'

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 space-y-6">
      <div className="relative flex items-center justify-center">

        <div className="w-24 h-24 rounded-full border-4 border-slate-50 opacity-20"></div>

        <div className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-green-400 animate-spin"></div>

        <div className="absolute">
          <PetLeg
            className="w-10 h-10 text-green-300 animate-pulse"
            fill="currentColor"
          />
        </div>

        <div className="absolute -z-10 w-48 h-48 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-2xl font-semibold text-slate-500 flex items-baseline">
          Loading
          <span className="flex ml-1">
            <span className="animate-[bounce_1.4s_infinite_0ms]">.</span>
            <span className="animate-[bounce_1.4s_infinite_200ms]">.</span>
            <span className="animate-[bounce_1.4s_infinite_400ms]">.</span>
          </span>
        </h2>
      </div>
    </div>
  )
}
