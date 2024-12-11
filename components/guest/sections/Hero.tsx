'use client'
import DefaultMaxWidth from "@/components/DefaultMaxWidth"
import Button from "@/components/Button"
import FindADoctorCard from "@/components/guest/FindADoctorCard"
import { useGSAP } from "@gsap/react"
import { useRef, useState } from "react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from '@iconify/react';
import Image from "next/image"
import SplitType from "split-type"

gsap.registerPlugin(useGSAP,ScrollTrigger);
const Hero = () => {
  const sectionContainerRef = useRef(null)
  const heroImgRef = useRef(null)
  const heroTextRef = useRef(null)
  const heroCardRef = useRef(null)
  const stripeRef = useRef(null)
  
  useGSAP(()=>{
    const tl = gsap.timeline({ defaults: { markers: true } })
    gsap.set(heroImgRef.current, {autoAlpha: 1})
    gsap.set(heroTextRef.current, {autoAlpha: 1})
    gsap.set(heroCardRef.current, {autoAlpha: 1})

    tl.fromTo(
      heroTextRef.current,
      {x: '-150%'},
      {x: 0, duration: 1, ease: 'power3.inOut'},
    ).fromTo(
      heroCardRef.current,
      {translateX: '150%'},
      {translateX: '60%', duration: 1, ease: 'elastic.inOut(1, 0.8)'},
      '<'
    ).fromTo(
      // hero image entry
      heroImgRef.current,
      {y: '100%'},
      {y: '0%', duration: 1, ease: 'elastic.inOut(1, 0.8)'},
    )

    // hero image scroll animation
    gsap.to(heroImgRef.current, {
      scale: 1.2,
      scrollTrigger: {
        trigger: sectionContainerRef.current,
        start: "top 10%",
        end: "bottom top",
        scrub: true,
      },
    });

    // stripe animation
    const q = gsap.utils.selector(stripeRef);
    gsap.set(q("div"), { autoAlpha: 1 });
    tl.fromTo(
      q("div"),
      { translateY: '100%' },
      { translateY: 0, duration: 0.4, stagger: 0.3, ease: 'power2.out' },
      "<"
    );
    // add scroll trigger animations to each strip too
    const stripOptions:ScrollTrigger.Vars = {
      trigger: sectionContainerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
    gsap.to(q("div:nth-child(1)"), {
      translateX: '200%',
      borderRadius: '100px',
      scrollTrigger: stripOptions,
    })
    // add scroll trigger animations to each strip too
    gsap.to(q("div:nth-child(2)"), {
      translateX: '-100%',
      borderRadius: '100px',
      scrollTrigger: stripOptions,
    })

    // animate entire section container
    gsap.to(sectionContainerRef.current, {
      scrollTrigger: {
        trigger: sectionContainerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: '10%',
      ease: 'none',
    })

    // animate hero text
    const hq = gsap.utils.selector(heroTextRef)
    const heroText = new SplitType(hq('h1'), { types: 'lines' })
    gsap.to(
      heroText.lines,
      {
        scrollTrigger: {
          trigger: sectionContainerRef.current,
          start: "top 10%",
          end: "bottom top",
          scrub: true,
        },
        y: '-100%',
        scale: 1.2,
        ease: 'power3.inOut',
        stagger: {
          each: 0.02,
        },
      }
    )
  });

  const [showFindADoctor, setShowFindADoctor] = useState(false)
  const toggleFindADoctor = () => {
    setShowFindADoctor(prev => {
      if (prev) {
        gsap.to(
          heroCardRef.current,
          { 
            translateX: '60%',
            ease: 'elastic.inOut(1, 1.2)',
            duration: 1
          }
        )
      } else {
        gsap.to(
          heroCardRef.current,
          {
            translateX: '0%',
            ease: 'elastic.inOut(1, 1.2)',
            duration: 1
          }
        )
      }
      return !prev
    })
  }
  
  return (
    <section className="flex flex-col">
      <section
        ref={sectionContainerRef}
        className="flex-1 flex items-center bg-gradient-to-r from-teal-500 via-accent-teal
        to-accent-emerald min-h-[80svh] relative overflow-hidden">
        <DefaultMaxWidth
          tag="div"
          paddingSides="x"
          className="grid grid-cols-7 w-full">
          <div
            ref={heroTextRef}
            className="md:max-w-[80%] opacity-0 col-span-4 py-10 self-center">
            <h1
              className="font-bold tracking-tighter
              text-white [font-size:_clamp(4em,8vw,12em)] leading-none">
              Book Your Healthcare Appointments with Ease
            </h1>
            <p className="max-w-[600px] text-teal-100 [font-size:_clamp(1em,3vw,1.5em)]">
              Find and book appointments with top healthcare providers in your area.
              Fast, easy, and convenient.
            </p>
            <Button title="Get Started" className="text-xl mt-4 !text-accent-emerald" />
          </div>

          <div className="col-span-3 relative">
            <div className="absolute inset-x-0 -bottom-[240px]">
              <Image
                ref={heroImgRef}
                src='/images/hero.png'
                alt="hero" width={400} height={400}
                priority
                className="opacity-0 object-bottom"
              />
            </div>
          </div>

          <div
            ref={heroCardRef}
            className="absolute right-0 inset-y-0 flex items-center
            p-5 md:p-14 opacity-0">
            <FindADoctorCard />
            <button
              onClick={toggleFindADoctor}
              className={`absolute left-0 text-5xl rounded-full bg-transparent
              transition-color duration-300 hover:text-text hover:bg-primary
              ${showFindADoctor ? '!bg-primary text-text' : 'animate-wiggle'}`}>
              <Icon
                className={`${showFindADoctor ? 'rotate-180' : ''} delay-500
                transition-transform duration-300`}
                icon="ei:arrow-left"
              />
            </button>
          </div>
        </DefaultMaxWidth>
      </section>
      <section
        ref={stripeRef}
        className="relative h-[12svh] [&>*]:absolute [&>*]:inset-x-0
        bg-yellow-50 [&>*]:opacity-0 overflow-hidden">
        <Strip className="bg-secondary-amber h-full before:rounded-r-none before:-right-4" />
        <Strip className="bg-secondary before:!border-dark/30 h-1/2 bottom-0 before:rounded-l-none before:-left-4" />
      </section>
    </section>
  )
}

const Strip = ({className}: {className: string}) => (
  <div className={`absolute inset-x-0 before:absolute before:inset-1.5 before:rounded-full
  before:border-4 before:border-primary before:border-inset
  before:border-dashed ${className}`} />
)

export default Hero