'use client'
import DefaultMaxWidth from "@/components/DefaultMaxWidth"
import Noise from "@/components/common/Noise"
import Image from "next/image"

const Hero = () => {

  return (
    <section
      data-hero
      className="flex flex-col min-h-svh text-3xl relative
      bg-gradient-to-t from-yale-blue-400 to-yale-blue-600
      overflow-hidden">
      <Noise className="absolute inset-0 mix-blend-screen opacity-70" />
    </section>
  )
}

export default Hero