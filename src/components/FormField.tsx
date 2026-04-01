type FormFieldProps = {
  id?: string;
  title?: string;
  error?: string;
  children: React.ReactNode;
  details?: string;
}

export const FormField = ({ id,title, error, children, details }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {title && (
        <label className="text-sm font-medium text-gray-700" htmlFor={id}>
          {title}
        </label>
      )}
      {children}
      <div className={`flex ${error ? 'justify-between' : 'justify-end'}`}>
        {error && (
          <span className="text-xs text-red-500 mt-1 transition-all duration-300 ease-out opacity-100 translate-y-0">{error}</span>
        )}
        {details && (
          <span className="text-xs text-gray-400 mt-1 transition-all duration-300 ease-out opacity-100 translate-y-0">{details}</span>
        )}
      </div>
    </div>
  )
}
