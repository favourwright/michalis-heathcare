'use client'
import Hero from "@/components/guest/sections/Hero"
import WaitingRoom from "@/components/guest/sections/WaitingRoom"
import WhyChooseUs from "@/components/guest/sections/WhyChooseUs"
import SignInOrSignup from "@/components/SignUporIn"

const Page = () => {
  return (
    <div>
      <Hero />
      {/* <WhyChooseUs />
      <WaitingRoom /> */}
      <div className="min-h-svh bg-white"></div>
    </div>
  )
}

export default Page