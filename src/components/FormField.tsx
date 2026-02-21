type FormFieldProps = {
  id: string;
  title?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({ id,title, error, children }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {title && (
        <label className="text-sm font-medium text-gray-700" htmlFor={id}>
          {title}
        </label>
      )}
      {children}
      {error && (
        <span className="text-xs text-red-500 mt-1 transition-all duration-300 ease-out opacity-100 translate-y-0">{error}</span>
      )}
    </div>
  )
}
