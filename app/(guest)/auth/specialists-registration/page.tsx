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
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>North America</SelectLabel>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                  <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                  <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Europe & Africa</SelectLabel>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                  <SelectItem value="cet">Central European Time (CET)</SelectItem>
                  <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                  <SelectItem value="west">
                    Western European Summer Time (WEST)
                  </SelectItem>
                  <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                  <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Asia</SelectLabel>
                  <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                  <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                  <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                  <SelectItem value="ist_indonesia">
                    Indonesia Central Standard Time (WITA)
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Australia & Pacific</SelectLabel>
                  <SelectItem value="awst">
                    Australian Western Standard Time (AWST)
                  </SelectItem>
                  <SelectItem value="acst">
                    Australian Central Standard Time (ACST)
                  </SelectItem>
                  <SelectItem value="aest">
                    Australian Eastern Standard Time (AEST)
                  </SelectItem>
                  <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                  <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>South America</SelectLabel>
                  <SelectItem value="art">Argentina Time (ART)</SelectItem>
                  <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                  <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                  <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                </SelectGroup>
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