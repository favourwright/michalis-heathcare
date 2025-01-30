'use client'
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"
import Noise from "@/components/common/Noise"
import Image from "next/image"
import { Icon } from '@iconify/react';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateHeroImageSection, animateHeroText } from "@/animations/hero";
import useGetStartedStore from "@/stores/get-started"

type Props = {
}
const Hero = ({  }: Props) => {
  gsap.registerPlugin(ScrollTrigger);
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline()
      tl
        .add(animateHeroText())
        .add(animateHeroImageSection(), '-=1')
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section ref={heroRef} className="overflow-hidden">
      <div
        data-hero
        className="flex flex-col min-h-svh text-3xl relative
        bg-gradient-to-t from-yale-blue-400 to-yale-blue-600
        overflow-hidden">
        <DefaultMaxWidth
          tag="div"
          paddingSides="x"
          className="w-full flex max-md:flex-col justify-between py-3 pt-28
          gap-10 relative">
          <div
            data-hero-text
            className="md:max-w-[80%] flex-1 self-center opacity-0
            relative z-10">
            <h1
              className="font-bold tracking-tighter text-clamp-md md:text-clamp-xl
              text-white leading-none">
              Book Your Healthcare Appointments with Ease
            </h1>
            <p className="max-w-[600px] text-white/50 text-clamp-xs mt-6 opacity-0 leading-tight">
              Find and book appointments with top healthcare providers in your area.
              Fast, easy, and convenient.
            </p>
          </div>
          <HeroImageSection />
        </DefaultMaxWidth>
        <Noise className="absolute max-md:h-full md:w-full mix-blend-screen opacity-80" />
      </div>
    </section>
  )
}

const HeroImageSection = () => {
  const { openModal } = useGetStartedStore()

  return (
    <div
      data-hero-image
      className="flex-1 self-stretch flex p-3 bg-white/10 opacity-0
      ring-2 ring-mindaro/50 rounded-3xl select-none">
      <div className="flex-1 bg-yale-blue rounded-2xl relative overflow-hidden">        
        <Image
          src="/images/hero.jpeg"
          alt="Image of a male nurse"
          priority
          width={600}
          height={600}
          className="object-cover h-full w-full"
        />

        <div className="flex items-end absolute inset-0 p-4">
          <div className="flex-1 flex overflow-x-hidden rounded-lg">
            <button
              data-cta
              onClick={openModal}
              className="flex-1 p-2 flex justify-between items-center pl-6
              bg-yale-blue/30 rounded-lg text-3xl backdrop-blur
              text-mindaro-900 font-semibold shadow-lg shadow-yale-blue/30">
              <span>Get started</span>
              <span
                className="h-10 md:h-20 w-10 md:w-20 rounded-md bg-mindaro text-yale-blue
                flex items-center justify-center shadow-lg shadow-yale-blue/30">
                <span className="md:text-5xl">
                  <Icon icon="material-symbols:arrow-forward-ios-rounded" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero