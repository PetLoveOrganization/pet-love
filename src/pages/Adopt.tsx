import { Hero } from '@/components/Adopt/Hero'
import { PetList } from '@/components/Adopt/PetList'
import { QuickActions } from '@/components/Adopt/QuickActions'
import { Filters } from '@/components/Adopt/Filters'
import { Pagination } from '@/components/Pagination'
import { useFilters } from '@/hooks/useFilters'
import { Loading } from '@/components/Loading'

export default function AdoptPage () {
  const {
    pets,
    filters,
    petStates,
    currentPage,
    handleChange,
    handleQuickActionsChange,
    handleReset,
    handlePageChange,
    totalPages,
    loading,
    total,
  } = useFilters()

  const title = loading
    ? 'Loading pets...'
    : `Results: ${total}, Page ${currentPage} - Pet Love`

  return (
    <main className='mt-14'>
      <title>{title}</title>
      <meta
        name='description'
        content='Explore thousands of pets available for adoption. Filter by species, age, gender, and location to find your perfect companion.'
      />
      <form role='search' onChange={handleChange} >
        <Hero defaultText={filters.text}/>
        <div className='flex flex-col md:flex-row gap-8 p-8 w-full mx-auto '>
          <aside className='w-full md:w-1/4 2xl:w-1/5'>
            <Filters onReset={handleReset} initialFilters={filters}/>
          </aside>
          <section className='w-full md:w-3/4 xl:w-4/5'>
            <QuickActions petStates={petStates} initialFilters={filters} onQuickActionsChange={handleQuickActionsChange}/>
            {loading && <Loading />}
            {pets.length === 0 && !loading && <p className='text-center'>No pets found</p>}
            {!loading && <PetList pets={pets} />}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
          </section>
        </div>
      </form>
    </main>
  )
}
