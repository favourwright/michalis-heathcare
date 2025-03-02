'use client'
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { specializations } from "@/data/specialist"
import { useEffect, useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { SpecialistInfo } from "@/types/specialist"
import { fbLogin, fbSignup, saveSpecialistInfo } from "@/actions/firestore/auth"
import { useToast } from "@/hooks/use-toast"
import { Icon } from "@iconify/react"

const Auth = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [formType, setFormType] = useState<'register' | 'login'>('register')
  useEffect(() => {
    if (!api) return
    api.scrollTo(formType === 'register' ? 0 : 1)
  }, [formType])

  useEffect(() => {
    if (!api) return
    api.on("select", () => {
      const selected = api.selectedScrollSnap() + 1
      setFormType(selected === 1 ? 'register' : 'login')
    })
  }, [api])
  
  return (
    <div>
      <div className="pt-20 md:pt-28 bg-tiffany-blue-100">
        <DefaultMaxWidth
          tag="div"
          className="w-full flex flex-col gap-3">
          <div
            className="text-2xl md:text-clamp-md font-bold leading-none
            text-white overflow-hidden">
            <h2 className="inline-flex whitespace-nowrap">
              <span className="whitespace-nowrap flex items-center mr-2.5">
                Ex
                <hr className="w-12 md:w-20 border-mindaro-300 border md:border-2" />
                pand
              </span>
              Your Practice<span className="text-mindaro-300">.</span>
            </h2>

            <h2>Connect with More Patients<span className="text-mindaro-300">.</span></h2>
          </div>
        </DefaultMaxWidth>
      </div>

      <DefaultMaxWidth
        tag="div"
        className="w-full grid md:grid-cols-2 gap-10">
        <div className='bg-gray-50 rounded-xl md:rounded-3xl h-full overflow-hidden max-md:h-32'>
          <Image
            src="https://images.pexels.com/photos/4989133/pexels-photo-4989133.jpeg"
            alt="closeup image of a female wearing a mask"
            priority
            width={600}
            height={600}
            className="object-cover h-full w-full"
          />
        </div>

        <div>
          <div className="flex items-end gap-4 [&>button]:transition-all [&>button]:duration-300 font-semibold">
            <button
              className={`leading-none text-lg max-md:flex-1 px-3 p-2 rounded-2xl bg-yale-blue text-white
              ${formType !== 'register' && 'opacity-30'}`}
              onClick={() => setFormType('register')}>
              Register
            </button>
            <button
              className={`leading-none text-lg max-md:flex-1 px-3 p-2 rounded-2xl bg-yale-blue text-white
              ${formType !== 'login' && 'opacity-30'}`}
              onClick={() => setFormType('login')}>
              Login
            </button>
          </div>
          
          <div className='mt-6 md:mt-10'>
            <Carousel className="w-full mt-4 select-none" setApi={setApi}>
              <CarouselContent>
                <CarouselItem key={1}>
                  <SpecialistRegistrationForm />
                </CarouselItem>
                <CarouselItem key={2}>
                  <SpecialistLogin />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </DefaultMaxWidth>
    </div>
  )
}

const SpecialistRegistrationForm = () => {
  const { toast } = useToast()
  const [signingUp, setSigningUp] = useState(false)

  const [form, setForm] = useState<Omit<SpecialistInfo, 'id' | 'createdAt' | 'updatedAt'>>({
    firstname: '',
    lastname: '',
    email: '',
    specialty: '',
    license: '',
    location: '',
    password: ''
  })

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSigningUp(true)

    try {
      // signup with email and password
      const user = await fbSignup(form.email, form.password, true)
      // save rest of user info to firestore
      await saveSpecialistInfo(form)
      // reset form
      setForm({
        firstname: '',
        lastname: '',
        email: '',
        specialty: '',
        license: '',
        location: '',
        password: ''
      })

      toast({
        title: "Account created successfully",
        description: "You can now login to your account",
      })
    } catch (error) {
      console.error({ userRegistrationError: error});
      toast({
        title: "Error",
        description: "An error occurred, please try again",
      })
    } finally {
      setSigningUp(false)
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <div className="grid gap-6 p-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label className="pl-1" htmlFor="firstname">Firstname</Label>
            <Input
              value={form.firstname}
              onChange={(e) => setForm({ ...form, firstname: e.target.value })}
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Your first name"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="pl-1" htmlFor="lastname">Lastname</Label>
            <Input
              value={form.lastname}
              onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Your last name"
              required
            />
          </div>
        </div>

        <div className="grid gap-1">
          <Label className="pl-1" htmlFor="email">Email</Label>
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="grid gap-1">
          <Label className="pl-1" htmlFor="password">Password</Label>
          <Input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="text"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <fieldset className="border-t-2 my-6 border-mindaro-300">
          <legend className="px-4 text-center">
            <p className="leading-tight text-gray-500">work info</p>
          </legend>
        </fieldset>


        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label className="pl-1" htmlFor="specialty">Specialty</Label>
            <Select value={form.specialty} onValueChange={(e) => setForm({ ...form, specialty: e })}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((specialization) => (
                  <SelectItem key={specialization.value} value={specialization.value}>{specialization.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label className="pl-1" htmlFor="license">License</Label>
            <Input
              value={form.license}
              onChange={(e) => setForm({ ...form, license: e.target.value })}
              type="text"
              id="license"
              name="license"
              placeholder="Enter your license"
              required
            />
          </div>
        </div>

        <div className="grid gap-1">
          <Label className="pl-1" htmlFor="location">Location</Label>
          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            type="text"
            id="location"
            name="location"
            placeholder="Enter your location"
            required
          />
        </div>

        <Button type="submit" variant="default" size="default">
          {signingUp ? <Icon icon="eos-icons:loading" className="animate-spin" /> : "Register"}
        </Button>
      </div>
    </form>    
  )
}

const SpecialistLogin = () => {
  const { toast } = useToast()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [processing, setProcessing] = useState(false)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setProcessing(true)

    try {
      await fbLogin({
        email: form.email,
        password: form.password,
        isSpecialist: true
      })
      toast({
        title: "Login successful",
        description: "You can now login to your account",
      })
    } catch (error) {
      console.error({ userRegistrationError: error});
      toast({
        title: "Error",
        description: "An error occurred, please try again",
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="grid gap-6 p-1">
        <div className="grid gap-1">
          <Label className="pl-1" htmlFor="email">Email</Label>
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="grid gap-1">
          <Label className="pl-1" htmlFor="password">Password</Label>
          <Input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <Button type="submit" variant="default" size="default">
          {processing ? <Icon icon="eos-icons:loading" className="animate-spin" /> : "Login"}
        </Button>
      </div>
    </form>
  )
}

export default Auth