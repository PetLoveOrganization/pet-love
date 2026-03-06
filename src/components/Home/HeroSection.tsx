import { AnchorButton } from '@/components/AnchorButton'

export function HeroSection () {
  return (
    <section className='my-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-16 justify-between items-center'>
      <article className='flex-1 flex flex-col gap-6'>
        <h1 className='text-4xl lg:text-5xl font-bold text-pretty'>
            Look for your new <span className='text-green-pet'>best friend</span> today
        </h1>
        <p className='text-lg lg:text-xl text-pretty'>Explore thousands of pets waiting for a loving home. Your perfect companion is just a click away.
        </p>
        <div className='flex gap-2'>
          <AnchorButton href="/pets" className='py-3' hasShadow={true}>
              Adopt now
          </AnchorButton>
          <AnchorButton href="#how-it-works" className='bg-transparent border border-green-400/20 py-3' variant='secondary'>
              How it works
          </AnchorButton>
        </div>
      </article>
      <picture className='flex-1 h-full w-full'>
        <img src="dog_home.webp" alt="dog" className='w-full h-full object-cover rounded-xl shadow-2xl shadow-green-500/20 '/>
      </picture>
    </section>
  )
}
