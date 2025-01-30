import Image from "next/image"

type Props = {
  priority?: boolean
  expanded?: boolean
  className?: string
}

const Logo = ({ priority, expanded, className }: Props) => {
  const appNameAlias = process.env.APP_NAME_ALIAS

  return (
    <div className={`flex items-center  ${className}`}>
      <Image
        data-logo
        data-expanded={expanded}
        className="object-contain ring-4 md:ring-2 ring-mindaro-300
        rounded relative z-10 max-md:h-8 max-md:w-8"
        src="/images/helt.jpg"
        alt="Logo"
        priority={priority}
        width={50}
        height={50}
      />
      <div
        data-logo-text
        className={`flex items-end bg-mindaro pr-1.5 ${expanded ? 'opacity-100' : 'opacity-0'}
        rounded-r-md self-stretch p-1.5 transition-opacity duration-300`}>
        <span className="md:text-2xl font-bold text-mindaro-100 leading-none">
          {appNameAlias}
        </span> 
      </div>
    </div>
  )
}

export default Logo