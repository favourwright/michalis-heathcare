import React, { useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import DefaultMaxWidth from '@/components/common/DefaultMaxWidth'
import { Icon } from "@iconify/react"
import Image from "next/image"

type Props = {}

type Testimonial = {
  message: string
  testifier: string
  role: string
  image?: string
}
const testimonials: Testimonial[] = [
  {
    message: "Booking a doctor's appointment has never been easier! I used to spend hours on calls and waiting for confirmations, but with this service, I found a specialist and secured a slot within minutes. The convenience is unmatched, and I love how I can track my appointments effortlessly!",
    testifier: "Emily Carter",
    role: "Marketing Manager",
    image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg"
  },
  {
    message: "I was able to schedule a specialist visit in minutes without the usual back-and-forth calls. The platform is so user-friendly, and I even received timely reminders so I wouldn’t forget my appointment. This is exactly what the healthcare industry needed—efficiency and accessibility!",
    testifier: "James Holloway",
    role: "Software Engineer",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  },
  {
    message: "Seamless experience from start to finish. I was able to browse doctors in my area, check their availability, and book an appointment all in one place. No more stress or long wait times! The process was so smooth that I recommended it to my entire family.",
    testifier: "Sophia Martinez",
    role: "HR Consultant",
    image: "https://images.pexels.com/photos/2081347/pexels-photo-2081347.jpeg"
  },
  {
    message: "This platform makes healthcare so accessible! I scheduled my annual check-up in under two minutes, and the confirmation was instant. I even received details on how to prepare for my visit. It’s such a relief to have a service that truly puts the patient’s time first!",
    testifier: "David Kim",
    role: "Financial Analyst",
    image: "https://images.pexels.com/photos/6626873/pexels-photo-6626873.jpeg"
  },
  {
    message: "I no longer stress about finding a doctor. The search feature is incredibly intuitive, allowing me to filter based on availability and specialty. I even got a follow-up notification, which made my experience even better. Highly recommend for busy professionals!",
    testifier: "Olivia Roberts",
    role: "Teacher",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
  },
  {
    message: "Such an efficient platform! I needed to see a specialist urgently, and this service helped me find one with an open slot the very next day. The process was smooth, and I love how transparent the pricing and insurance details were. No hidden surprises, just a stress-free experience!",
    testifier: "Michael Brown",
    role: "Project Manager",
    image: "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
  },
  {
    message: "Absolutely love how simple it is to book a healthcare appointment now. The interface is clean, the doctor profiles are detailed, and I appreciate the review system, which helped me find a trusted provider. This service saves so much time and effort!",
    testifier: "Rachel Adams",
    role: "Freelance Writer",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
  },
  {
    message: "This platform is a game-changer for busy professionals like me! I found a doctor nearby, checked reviews, and booked an appointment instantly. The best part? I didn’t have to worry about paperwork—it was all handled seamlessly. Will definitely be using it again!",
    testifier: "Daniel Lee",
    role: "Entrepreneur",
    image: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg"
  }
];

const Testimonial = ({}: Props) => {
  // these enable the image part of the testimonial to be controlled by the
  // actively selected testimonial
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()
  const testimonialProfileImages = testimonials.map(testimonial => testimonial.image)
  useEffect(() => {
    if(!api) return
    api.scrollTo(currentTestimonial-1)
  }
  , [currentTestimonial])


  return (
    <div className=''>
      <DefaultMaxWidth
        tag="div"
        className="w-full flex flex-col gap-3">
        <h2 className='leading-none text-clamp-md text-gray-700'>Testimonials</h2>
        <p className='text-xl text-gray-400'>This is what some of the users of our services are saying about us</p>
        
        <div className='mt-10 grid md:grid-cols-6 gap-10'>
          <div className='md:col-span-4'>
            <CarouselDApiDemo emitActiveIndex={setCurrentTestimonial} />
          </div>

          <div className='max-md:row-start-1 md:col-span-2'>
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent className="h-64">
                {testimonialProfileImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-full w-full rounded-xl overflow-hidden">
                      <Image
                        src={image || "http://via.placeholder.com/600x600"}
                        alt="Image of a male nurse"
                        priority
                        width={600}
                        height={600}
                        className="object-cover h-full w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </DefaultMaxWidth>
    </div>
  )
}

export function CarouselDApiDemo({ emitActiveIndex }: { emitActiveIndex: (index: number)=>void }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) return
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1))
  }, [api])

  const handleNext = () => {
    if(!api) return
    api.scrollNext()
    emitActiveIndex(api.selectedScrollSnap() + 1)
  }
  const handlePrev = () => {
    if(!api) return
    api.scrollPrev()
    emitActiveIndex(api.selectedScrollSnap() + 1)
  }

  return (
    <div>
      <span className="text-right block font-bold text-gray-300">
        <span className="text-3xl text-gray-600">{ current }</span> / { count }
      </span>

      <div className="md:px-10 md:border-2 border-gray-100 rounded-2xl py-6">
        <Carousel
          setApi={setApi}
          className="w-full max-md:max-w-xs">
          <CarouselContent>
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={i}>
                <span className='text-3x text-gray-600 italic'>{ testimonial.message }</span>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-10 mt-10 text-2xl text-gray-600">
        <SeekBtns onClick={handlePrev}>
          <Icon icon="feather:chevron-left" />
        </SeekBtns>
        <SeekBtns onClick={handleNext}>
          <Icon icon="feather:chevron-right" />
        </SeekBtns>
      </div>
    </div>
  )
}

type SeekBtnProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SeekBtns = ({
  children,
  onClick,
  ...props
}: SeekBtnProps) => {
  return (
    <button
      {...props}
      className='h-16 w-16 border-2 border-gray-100 hover:border-mindaro-500
      transition-all duration-300 active:scale-95 hover:bg-mindaro-700
      rounded-full flex items-center justify-center'
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Testimonial