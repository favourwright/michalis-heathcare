'use client'
import Faq from "@/components/guest/sections/Faq"
import Hero from "@/components/guest/sections/Hero"
import Testimonial from "@/components/guest/sections/Testimonial"
import WaitingRoom from "@/components/guest/sections/WaitingRoom"
import WhyChooseUs from "@/components/guest/sections/WhyChooseUs"
import SignInOrSignup from "@/components/SignUporIn"

const Page = () => {
  return (
    <div>
      <Hero />
      <Testimonial />
      <Faq />
    </div>
  )
}

export default Page