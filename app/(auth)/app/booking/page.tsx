'use client'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import Booking from "@/components/Booking"
import Button from "@/components/common/Button"
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"

enum BookingStatus {
  UPCOMING = 'upcoming',
  PAST = 'past',
  CANCELED = 'canceled'
}

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState(BookingStatus.UPCOMING)

  return (
    <div className="w-full">
      <DefaultMaxWidth withPadding={false} className="flex max-md:flex-col gap-3 md:items-start">
        <div className="flex-1">
          <h1 className="text-clamp-xs font-semibold">Bookings</h1>
          <p className="text-gray-500 text-lg font-medium">See your scheduled events from your calendar events links.</p>
        </div>

        <Button onClick={()=>{}}>New Booking</Button>
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
        <BookingList list={[1,2,3]} />
      </DefaultMaxWidth>
    </div>
  )
}

type BookingItem = {

}
const BookingList = ({list}:{list:BookingItem[]}) => {
  return (
    <div className="grid gap-3">
      {list.map((item,i)=><Booking
        key={i}
        amount={100}
        createdAt={new Date()}
        requestId={i}
        sellerId={i}
        buyerId={i}
        isSeller
      />)}
    </div>
  )
}


export default BookingPage