import DefaultMaxWidth from "@/components/DefaultMaxWidth"

const Header = () => {
  const appNameAlias = process.env.APP_NAME_ALIAS
  return (
    <header className="bg-white">
      <DefaultMaxWidth
        tag="div"
        paddingSides="x"
        className="w-full flex items-center justify-between py-2">
        <span className="text-2xl font-bold text-accent">{appNameAlias}</span>
      </DefaultMaxWidth>
    </header>
  )
}

export default Header