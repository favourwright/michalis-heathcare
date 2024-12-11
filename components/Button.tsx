type Props = {
  title?: string
  isLoading?: boolean
  onClick?: (e:any)=>void
  disabled?: boolean
  children?: React.ReactNode
} & React.ComponentProps<'button'>
const Button = ({title='Continue', isLoading, className, children, ...props}:Props) => {
  const hasChildren = children ? true : false
  return (
    <button
      className={`text-center px-6 py-2 bg-primary text-text
      rounded-full outline-none relative overflow-hidden ${className}`}
      {...props}>
      {hasChildren ? children : title}
      {isLoading && <div className='absolute inset-0 bg-white/80 flex items-center justify-center'>
        {/* <CircularProgress size={26} color="success" /> */}
      </div>}
    </button>
  )
}

export default Button