'use client'
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const howItWorks = [
  {
    icon: 'icon-park-solid:people-search-one',
    title: 'Search for a Specialist',
    description: 'Find qualified healthcare professionals in your area.'
  },
  {
    icon: 'uim:calender',
    title: 'Book an Appointment',
    description: 'Schedule with ease, online or in person.'
  },
  {
    icon: 'solar:cup-star-bold-duotone',
    title: 'Get Quality Care',
    description: 'Connect with verified specialists for top-tier healthcare.'
  }
]


const About = () => {
  const appNameAlias = process.env.APP_NAME_ALIAS

  return (
    <div className="min-h-svh">
      <div className="h-[40vh] md:h-[70vh] overflow-hidden relative select-none">
        <Image
          src="https://images.pexels.com/photos/6667709/pexels-photo-6667709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="about image"
          fill
          className="absolute inset-0 object-cover"
        />

        <div
          className="relative z-10 h-full flex items-end justify-center
          bg-gradient-to-t from-yale-blue-200 to-transparent">
          <h1 className="text-clamp-xl md:text-clamp-7xl leading-none text-lavender-blush max-md:pb-4">About Us</h1>
        </div>
      </div>

      <div>
        <DefaultMaxWidth className="text-center">
          <h3 className="text-clamp-sm text-gray-700 font-medium">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Icon icon={item.icon} className="text-4xl md:text-6xl text-mindaro-100" />
                <h4 className="mt-2 font-semibold">{item.title}</h4>
                <p className="max-w-xs text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </DefaultMaxWidth>

        <DefaultMaxWidth className="w-full grid md:grid-cols-2 gap-10 bg-gray-50">
          <div className="py-10 max-md:pb-0">
            <h3 className="text-clamp-sm text-gray-700 font-medium mb-10 max-w-[200px] leading-none">
              Who we are at {appNameAlias}
            </h3>
            <WhoWeAre />
          </div>

          <div
            className='bg-gray-50 rounded-xl md:rounded-3xl
            h-full overflow-hidden max-md:h-56 relative'>
            <Image
              src="https://images.pexels.com/photos/4515858/pexels-photo-4515858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="closeup image of a female wearing a mask"
              priority
              fill
              className="object-cover"
            />
          </div>
        </DefaultMaxWidth>

        <DefaultMaxWidth className="w-full">
          <div className="grid md:grid-cols-2 rounded-xl md:rounded-3xl bg-lavender-blush-800">
            <div className="p-6 md:p-10">
              <h3 className="text-clamp-sm text-gray-700 font-medium">
                Effortless Appointments, Exceptional Care.
              </h3>
            </div>

            <div
              className='bg-gray-50 rounded-xl md:rounded-3xl md:col-start-1 md:row-start-1
              h-full overflow-hidden max-md:h-32 relative'>
              <Image
                src="https://images.pexels.com/photos/7723513/pexels-photo-7723513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="closeup image of a female wearing a mask"
                priority
                fill
                className="object-cover"
              />
            </div>
          </div>
        </DefaultMaxWidth>
      </div>
    </div>
  )
}

const whoWeAre = [
  {
    section: "mission",
    text: "We are a technology-driven platform that connects patients with healthcare specialists seamlessly. Our goal is to eliminate the hassle of booking appointments, ensuring that access to quality care is just a few clicks away."
  },
  {
    section: "vision",
    text: "We envision a world where everyone has access to top-tier healthcare. We are committed to bridging the gap between patients and specialists, ensuring that everyone receives the care they deserve."
  },
  {
    section: "values",
    text: "Our core values are centered around quality, integrity, and innovation. We are dedicated to providing a platform that is secure, reliable, and user-friendly, ensuring that patients and specialists have a seamless experience."
  }
]

const WhoWeAre = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
 
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
  }, [api])

  const seek = (index: number) => {
    if (!api) return
    api.scrollTo(index)
  }

  return (
    <div className="max-w-md">
      <div className="flex gap-2">
        {whoWeAre.map((item, index)=><button
          key={index}
          onClick={()=>seek(index)}
          className={`rounded-full px-4 py-2 font-semibold text-sm
          capitalize transition-all duration-300
          ${current === index + 1 ? 'bg-gray-300' : 'bg-gray-100'}`}>
          {item.section}
        </button>)}
      </div>

      <Carousel className="w-full mt-4 select-none" setApi={setApi}>
        <CarouselContent>
          {whoWeAre.map((item, index) => (
            <CarouselItem key={index}>
              <p className="text-gray-700">{item.text}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default About