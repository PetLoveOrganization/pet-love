interface OptionButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  isSelected: boolean
  onClick: () => void
  className?: string
}

export const OptionButton = ({ icon: Icon, label, isSelected, onClick, className = '' }: OptionButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex flex-col items-center gap-2 cursor-pointer border-2 rounded-xl p-4 hover:border-green-pet transition-colors ${
        isSelected
          ? 'border-green-pet bg-green-pet/5'
          : 'border-gray-100'
      } ${className}`}
    >
      <Icon className='size-4 text-lime-700' />
      <span className='text-sm font-semibold text-gray-700'>{label}</span>
    </button>
  )
}
