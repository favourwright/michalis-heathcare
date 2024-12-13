'use client'
import DefaultMaxWidth from "@/components/DefaultMaxWidth"
import Noise from "@/components/common/Noise"
import Image from "next/image"
import { Icon } from '@iconify/react';

const Hero = () => {

  return (
    <section
      data-hero
      className="flex flex-col min-h-svh text-3xl relative
      bg-gradient-to-t from-yale-blue-400 to-yale-blue-600
      overflow-hidden">
      <DefaultMaxWidth
        tag="div"
        paddingSides="x"
        className="w-full flex max-md:flex-col justify-between py-3 pt-28 gap-10 relative">
        <div
          data-hero-text
          className="md:max-w-[80%] flex-1 py-10 self-center">
          <h1
            className="font-bold tracking-tighter text-clamp-xl
            text-white leading-none">
            Book Your Healthcare Appointments with Ease
          </h1>
          <p className="max-w-[600px] text-white/50 text-clamp-xs mt-6">
            Find and book appointments with top healthcare providers in your area.
            Fast, easy, and convenient.
          </p>
        </div>
        <HeroImageSection />
      </DefaultMaxWidth>
      <Noise className="absolute inset-0 mix-blend-screen" />
    </section>
  )
}

const HeroImageSection = () => {
  return (
    <div
      className="flex-1 self-stretch flex p-3 bg-white/10
      ring-2 ring-mindaro/50 rounded-3xl select-none">
      <div className="flex-1 bg-yale-blue rounded-2xl overflow-hidden relative">        
        <Image
          src="/images/hero.jpg"
          alt="Image of a male nurse"
          width={600}
          height={600}
          className="object-cover h-full w-full"
        />

        <div className="flex items-end absolute inset-0 p-4">
          <button
            className="flex-1 p-2 flex justify-between items-center pl-6
            bg-yale-blue/30 rounded-lg text-3xl backdrop-blur
            text-mindaro-900 font-semibold shadow-lg shadow-yale-blue/30">
            <span>Get started</span>
            <span
              className="h-20 w-20 rounded-md bg-mindaro text-yale-blue
              flex items-center justify-center shadow-lg shadow-yale-blue/30">
              <Icon icon="material-symbols:arrow-forward-ios-rounded" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero