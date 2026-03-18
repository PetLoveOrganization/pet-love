export function DashboardTitle ({ title, description }: { title: string, description: string }) {
  return (
    <header>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-gray-500 mt-1 font-light'>{description}</p>
    </header>
  )
}
