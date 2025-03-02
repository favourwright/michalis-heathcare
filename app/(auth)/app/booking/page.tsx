'use client'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import Booking from "@/components/Booking"
import Button from "@/components/common/Button"
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"
import useUserStore from "@/stores/user"
import { BookingStatus, BookingData } from "@/types/booking"
import { fetchAllBookings, fetchUserBookings } from "@/actions/firestore/booking"
import { useRouter } from "next/navigation"

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState(BookingStatus.UPCOMING)

  const { uid, isSpecialist } = useUserStore()
  const [bookings, setBookings] = useState<BookingData[]>([])
  const filteredBookings = bookings.filter((booking) => booking.status === activeTab)
  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const newBookings = bookings.map((booking) => {
      if (booking.id === id) {
        return {
          ...booking,
          status,
        }
      }
      return booking
    })

    setBookings(newBookings)
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async ()=>{
      if(!uid) return
      setLoading(true)
      const data = isSpecialist ? await fetchAllBookings() : await fetchUserBookings(uid)
      setBookings(data)
      setLoading(false)
    })()
  }, [uid, isSpecialist])

  const router = useRouter()
  const startNewBooking = () => router.push("/")

  return (
    <div className="w-full">
      <DefaultMaxWidth withPadding={false} className="flex max-md:flex-col gap-3 md:items-start">
        <div className="flex-1">
          <h1 className="text-clamp-xs font-semibold">Bookings</h1>
          <p className="text-gray-500 text-lg font-medium">See your scheduled events from your calendar events links.</p>
        </div>

        {!isSpecialist && uid && <Button onClick={startNewBooking}>New Booking</Button>}
      </DefaultMaxWidth>

      <DefaultMaxWidth withPadding={false} className="mt-6">
        <Tabs
          onValueChange={(value)=>setActiveTab(value as BookingStatus)}
          defaultValue={activeTab}
          className="max-w-xl">
          <TabsList className="w-full [&>*]:capitalize">
            {Object.values(BookingStatus).map((status) => (
              <TabsTrigger key={status} value={status} className="w-full">
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </DefaultMaxWidth>

      <DefaultMaxWidth withPadding={false} className="mt-4">
        {loading && <div className="grid gap-3 relative text-sm">
          {[1,2,3].map((_,i)=><div
            key={i}
            className="w-full h-20 bg-gray-50 border border-gray-200
            animate-pulse rounded-md">
          </div>)}
          <span className="absolute inset-0 flex items-center justify-center text-gray-400 italic font-bold">
            fetching...
          </span>
        </div>}
        {!loading && filteredBookings.length === 0 && <div className="grid gap-3 relative text-sm">
          <div className="w-full h-20 bg-gray-50 border border-gray-200 animate-pulse rounded-md"></div>
          <span className="absolute inset-0 flex items-center justify-center text-gray-400 italic font-bold">
            No Bookings
          </span>
        </div>}
        {!loading && <BookingList
          list={filteredBookings}
          updateStatus={(id, status) => updateBookingStatus(id, status)}
        />}
      </DefaultMaxWidth>
    </div>
  )
}

const BookingList = (
  {list, updateStatus}:
  {list:BookingData[], updateStatus: (id: string, status: BookingStatus) => Promise<void>}
) => {
  const { uid, isSpecialist } = useUserStore()

  return (
    <div className="grid gap-3">
      {list.map((item,i)=><Booking
        key={i}
        id={item.id}
        date={item.date}
        consultationSummary={item.consultationSummary}
        specialization={item.specialization}
        isSpecialist={!!isSpecialist}
        isPatient={item.patient === uid}
        meetingLink={item.meetingLink}
        updateStatus={updateStatus}
        status={item.status}
      />)}
    </div>
  )
}


export default BookingPage