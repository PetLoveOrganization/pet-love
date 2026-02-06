
type Props = React.InputHTMLAttributes<HTMLInputElement> & {

}

export const InputText = ({ className,children,...props }: Props) => {
  return (
    <div className='flex gap-2 items-end bg-gray-50 px-2 py-3 rounded-lg w-full'>
      {children}
      <input {...props} className={`placeholder:text-lime-700 w-full focus:outline-none ${className}`}/>
    </div>
  )
}
