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

const Auth = () => {
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
                <hr className="w-20 border-mindaro-300 border md:border-2" />
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
        paddingSides="a"
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
          <h2 className='leading-none text-2xl md:text-clamp-md text-gray-700'>Register</h2>

          <div className='mt-6 md:mt-10'>
            <SpecialistRegistrationForm />
          </div>
        </div>
      </DefaultMaxWidth>
    </div>
  )
}

const specializations = [
  { value: "general_practitioner", title: "General Practitioner" },
  { value: "cardiologist", title: "Cardiologist" },
  { value: "dermatologist", title: "Dermatologist" },
  { value: "endocrinologist", title: "Endocrinologist" },
  { value: "gastroenterologist", title: "Gastroenterologist" },
  { value: "neurologist", title: "Neurologist" },
  { value: "oncologist", title: "Oncologist" },
  { value: "ophthalmologist", title: "Ophthalmologist" },
  { value: "orthopedic_surgeon", title: "Orthopedic Surgeon" },
  { value: "otolaryngologist", title: "Otolaryngologist (ENT)" },
  { value: "pediatrician", title: "Pediatrician" },
  { value: "psychiatrist", title: "Psychiatrist" },
  { value: "pulmonologist", title: "Pulmonologist" },
  { value: "radiologist", title: "Radiologist" },
  { value: "rheumatologist", title: "Rheumatologist" },
  { value: "urologist", title: "Urologist" },
  { value: "obstetrician_gynecologist", title: "Obstetrician/Gynecologist (OB/GYN)" },
  { value: "nephrologist", title: "Nephrologist" },
  { value: "allergist_immunologist", title: "Allergist/Immunologist" },
  { value: "anesthesiologist", title: "Anesthesiologist" },
  { value: "plastic_surgeon", title: "Plastic Surgeon" },
  { value: "emergency_medicine_specialist", title: "Emergency Medicine Specialist" },
  { value: "sports_medicine_specialist", title: "Sports Medicine Specialist" },
  { value: "hematologist", title: "Hematologist" },
  { value: "infectious_disease_specialist", title: "Infectious Disease Specialist" }
]

const SpecialistRegistrationForm = () => {
  return (
    <form onSubmit={()=>{}}>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label className="pl-1" htmlFor="firstname">Firstname</Label>
            <Input
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
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a specialty" />
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
            type="text"
            id="location"
            name="location"
            placeholder="Enter your location"
            required
          />
        </div>

        <Button
          type="submit" variant="default" size="default">
          Register
        </Button>
      </div>
    </form>    
  )
}
  

export default Auth