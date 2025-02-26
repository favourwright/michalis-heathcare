'use client'
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"
import Button from "@/components/common/Button"
import Logo from "@/components/common/Logo"
import Link from 'next/link'
import useGetStartedStore from "@/stores/get-started"

type Props = {
}

const Footer = ({}: Props) => {
  const { openModal } = useGetStartedStore()
  const links = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "About",
      href: "/about"
    },
    {
      title: "Specialists",
      href: "/auth/specialists-registration"
    },
  ]

  return (
    <div className="bg-white">
      <div
        data-footer
        className="flex flex-row relative bg-yale-blue-200 overflow-hidden">
        <span className="font-bold tracking-tighter text-clamp-9xl select-none
          text-white/5 leading-none absolute top-0 left-1/4 md:right-0 -translate-y-1/3">
          Doctor
        </span>

        <DefaultMaxWidth
          tag="div"
          paddingSides="xy"
          className="w-full flex gap-10 md:gap-20 flex-col relative text-white/90">
          <div className="w-full grid md:grid-cols-3 gap-3">
            <p className="tracking-tighter leading-none text-clamp-sm">Get Started today for free</p>
            
            <div className="md:col-start-3 flex flex-col md:items-start gap-8">
              <p className="font-medium">
                Experience cutting-edge diagnostics and personalized care at a fraction of the cost. sign up now!
              </p>
              <Button onClick={openModal}>Get Started</Button>
            </div>
          </div>

          <hr className="border-white/10" />

          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-end">
              <Logo expanded className="grayscale" />
              <span className="font-bold leading-none text-clamp-sm">Links</span>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xl text-white/50">
              {links.map((link, i) => (
                <FooterLinks key={i} {...link} />
              ))}
            </ul>
          </div>
        </DefaultMaxWidth>
      </div>
    </div>
  )
}

const FooterLinks = ({ title, href, ...props }: { title: string, href: string }) => {
  return (
    <li className="flex flex-col group relative rounded-lg overflow-hidden">
      <Link
        {...props}
        href={href}
        className="w-full h-full p-3 bg-white/[0.02] border-b border-white/20">
        {title}
      </Link>
      <hr className="absolute inset-x-0 bottom-0
        w-0 border-white/50 group-hover:w-full transition-all duration-500"
      />
    </li>
  )
}

export default Footer