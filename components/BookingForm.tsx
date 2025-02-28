import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAuthContext } from "@/context/auth"
import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Textarea } from "@/components/ui/textarea"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
const BookingForm = () => {
  const { toast } = useToast()
  const [api, setApi] = useState<CarouselApi>()

  const [iKnowWhatImDoing, setIKnowWhatImDoing] = useState(false)
  useEffect(() => {
    if (!api) return
    api.scrollTo(iKnowWhatImDoing ? 1 : 0)
  }, [iKnowWhatImDoing])

  useEffect(() => {
    if (!api) return
    api.on("select", () => {
      const selected = api.selectedScrollSnap() + 1
      setIKnowWhatImDoing(selected === 2)
    })
  }, [api])

  const [form, setForm] = useState({
    specialist: "",
    summary: "",
    date: null as Date | null
  })

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // validate based on iKnowWhatImDoing
    if (!iKnowWhatImDoing && !form.summary) {
      toast({ title: "Error", description: "Please describe the issue" })
      return
    }
    if (iKnowWhatImDoing && !form.specialist) {
      toast({ title: "Error", description: "Please select a specialist" })
      return
    }
    if (!form.date) {
      toast({ title: "Error", description: "Please select a date" })
      return
    }

    console.log(form)
  }

  return (
    <div className="flex flex-col gap-4 max-md:px-4">
      <form
        onSubmit={handleForm}
        className={"grid items-start gap-4"}>
        <div
          className={`flex items-center justify-between rounded-lg
          border-2 border-gray-700 p-3 shadow-sm gap-4 ${!iKnowWhatImDoing && '!border-gray-300'}`}>
          <div className={`space-y-0.5 ${!iKnowWhatImDoing && 'opacity-40'}`}>
            <h3 className="font-semibold">I know what I'm doing</h3>
            <p className="text-sm text-gray-500">
              I know the type of specialist or doctor I want to see
            </p>
          </div>

          <Switch
            checked={iKnowWhatImDoing}
            onCheckedChange={(val) => setIKnowWhatImDoing(val)}
          />
        </div>

        <Carousel className="w-full select-none" setApi={setApi}>
          <CarouselContent>
            <CarouselItem key={1}>
              <div className="grid gap-1 p-1">
                <Label className="pl-1" htmlFor="summary">I am not sure</Label>
                <Textarea
                  name="summary"
                  value={form.summary}
                  onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
                  className="min-h-40 max-h-96 placeholder:text-gray-400"
                  placeholder="Give us a brief description of your problem"
                />
              </div>
            </CarouselItem>

            <CarouselItem key={2}>
              <div className="grid gap-1 p-1">
                <Label className="pl-1" htmlFor="specialists">What type of doctor do you want to see?</Label>
                <Select
                  name="specialists"
                  onValueChange={(val) => setForm((prev) => ({ ...prev, specialist: val }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialists" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((specialization) => (
                      <SelectItem key={specialization.value} value={specialization.value}>{specialization.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <DatePickerWithPresets updateSelection={(date) => setForm((prev) => ({ ...prev, date: date || new Date() }))} />

        <Button type="submit" className="capitalize">
          Book
        </Button>
      </form>
    </div>
  )
}


export function DatePickerWithPresets({ updateSelection }: { updateSelection: (value?: Date) => void}) {
  const [date, setDate] = useState<Date>()
  const handleSelect = (value?: Date) => {
    setDate(value)
    updateSelection(value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleSelect} />
        </div>
      </PopoverContent>
    </Popover>
  )
}


export default BookingForm