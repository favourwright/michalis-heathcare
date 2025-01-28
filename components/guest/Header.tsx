'use client'
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"
import NextLink from "next/link"
import Logo from "@/components/common/Logo"
import { animateHeader, animateHeaderLine } from "@/animations/header"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NoiseDark from "@/components/common/NoiseDark"
import Button from "@/components/common/Button"

const Header = () => {
  gsap.registerPlugin(ScrollTrigger);
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline()
      tl
        .add(animateHeader())
        .add(animateHeaderLine())
    }, headerRef)

    return () => context.revert()
  }, [])

  return (
    <header
      ref={headerRef}
      data-header
      className="group fixed top-0 inset-x-0 z-50 overflow-hidden">
      <DefaultMaxWidth
        tag="div"
        paddingSides="x"
        className="w-full flex items-center justify-between py-3 relative z-10">
        <NextLink className="md:translate-x-1.5" href="/">
          <Logo priority />
        </NextLink>

        <Button>Find a Doctor</Button>
      </DefaultMaxWidth>
      <hr data-hr className="border border-mindaro opacity-0 relative z-10 origin-left" />
      <div data-bg className="absolute inset-0 pointer-events-none" />
      <NoiseDark className="absolute inset-0 z-10 opacity-50 mix-blend-multiply pointer-events-none" />
    </header>
  )
}

export default Header