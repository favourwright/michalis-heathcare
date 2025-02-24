import DefaultMaxWidth from '@/components/common/DefaultMaxWidth'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'

type Props = {

}
const Faq = ({  }: Props) => {
  return (
    <div className='min-h-svh flex'>
      <DefaultMaxWidth
        tag="div"
        paddingSides="a"
        className="w-full grid md:grid-cols-2 gap-10">
        <div className='bg-gray-50 rounded-xl md:rounded-3xl h-full overflow-hidden'>
          <Image
            src="https://images.pexels.com/photos/4000758/pexels-photo-4000758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="closeup image of a female wearing a mask"
            priority
            width={600}
            height={600}
            className="object-cover h-full w-full"
          />
        </div>

        <div>
          <h2 className='text-clamp-md leading-none text-gray-700'>Frequently Asked Questions</h2>

          <div className='mt-6 md:mt-10'>
            <Faqs />
          </div>
        </div>
      </DefaultMaxWidth>
    </div>
  )
}

const faq = [
  {
    "question": "How does the appointment booking process work?",
    "answer": "Our platform allows you to search for healthcare providers based on specialty, location, and availability. Once you find a provider, you can book an appointment in just a few clicks and receive instant confirmation."
  },
  {
    "question": "Is this service free to use?",
    "answer": "Yes, our platform is completely free for patients. You only pay for your medical consultation or treatment as per the provider’s charges."
  },
  {
    "question": "Can I book an appointment for someone else?",
    "answer": "Absolutely! You can book appointments for family members or friends by selecting the option to add their details during the booking process."
  },
  {
    "question": "Do I need to create an account to book an appointment?",
    "answer": "While you can browse available doctors without an account, you will need to sign up to confirm an appointment, manage bookings, and receive reminders."
  },
  {
    "question": "How do I reschedule or cancel an appointment?",
    "answer": "You can reschedule or cancel your appointment through your dashboard. Simply go to your booking history and select the reschedule or cancel option."
  },
  {
    "question": "Are virtual consultations available?",
    "answer": "Yes! Many healthcare providers on our platform offer virtual consultations, which you can book just like in-person appointments."
  },
  {
    "question": "How do I know if my insurance is accepted?",
    "answer": "Each doctor’s profile lists the insurance providers they accept. You can filter search results based on your insurance provider for better convenience."
  },
  {
    "question": "What happens if a doctor cancels my appointment?",
    "answer": "If a doctor cancels your appointment, you will be notified immediately, and we will assist you in rescheduling with another available provider."
  },
  {
    "question": "Can I leave a review after my appointment?",
    "answer": "Yes, we encourage users to leave reviews and rate their experience to help others make informed choices when selecting a healthcare provider."
  },
  {
    "question": "Is my personal and medical information secure?",
    "answer": "Absolutely. We use encryption and follow strict privacy policies to ensure that your data is secure and never shared without your consent."
  }
]

export function Faqs() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faq.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}


export default Faq