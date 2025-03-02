'use client';
import { useState, useMemo } from 'react';
import moment from 'moment';
import { ChevronDown } from 'lucide-react';
import { BookingData, BookingStatus } from '@/types/booking';
import { setMeetingUrl, updateBookingStatus } from '@/actions/firestore/booking';
import { useToast } from "@/hooks/use-toast";
// import { Icon } from '@iconify/react';

type PaymentCardProps = {
  isSpecialist: boolean
  isPatient: boolean
  updateStatus: (id: string, status: BookingStatus) => Promise<void>
  updateMeetingLink: (id: string, meetingLink: string) => Promise<void>
} & Pick<BookingData, 'id' | 'date' | 'specialization' | 'consultationSummary' | 'meetingLink' | 'status'>

export default function PaymentCard({
  id,
  date,
  consultationSummary,
  specialization,
  meetingLink,
  isSpecialist,
  isPatient,
  updateStatus,
  status,
  updateMeetingLink
}: PaymentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dayText = useMemo(() => moment(date).format('ddd'), [date]);
  const dayNumber = useMemo(() => moment(date).format('DD'), [date]);
  
  const summary = useMemo(() => {
    return specialization ?
      `I need to see a ${specialization}` :
      `Summary: ${consultationSummary}`
  }, [specialization, consultationSummary]);

  const meetingLinkDetails = useMemo(() => {
    return meetingLink ? meetingLink : 'Link Not provided yet'
  }, [meetingLink]);

  const [updatingStatus, setUpdatingStatus] = useState(false)

  const { toast } = useToast()
  const handleAccept = async () => {
    setUpdatingStatus(true)
    try {
      await updateBookingStatus(id!, BookingStatus.UPCOMING)
      updateStatus?.(id!, BookingStatus.UPCOMING)
      toast({
        title: 'success',
        description: 'Booking accepted successfully'
      })
    } catch (error) {
      console.error({ error })
      toast({
        title: 'error',
        description: 'Something went wrong'
      })
    } finally {
      setUpdatingStatus(false)
    }
  }
  const handleCancel = async () => {
    setUpdatingStatus(true)
    try {
      await updateBookingStatus(id!, BookingStatus.CANCELLED)
      updateStatus?.(id!, BookingStatus.CANCELLED)
      toast({
        title: 'success',
        description: 'Booking cancelled successfully'
      })
    } catch (error) {
      console.error({ error })
      toast({
        title: 'error',
        description: 'Something went wrong'
      })
    } finally {
      setUpdatingStatus(false)
    }
  }

  const [meetingLinkForm, setMeetingLinkForm] = useState('')
  const [updatingMeetingUrl, setUpdatingMeetingUrl] = useState(false)
  const handleSetMeetingLink = async () => {
    setUpdatingMeetingUrl(true)
    try {
      updateMeetingLink?.(id!, meetingLinkForm)
      await setMeetingUrl(id!, meetingLinkForm)
      toast({
        title: 'success',
        description: 'Meeting link updated successfully'
      })
      setMeetingLinkForm('')
    } catch (error) {
      console.error({ error })
      toast({
        title: 'error',
        description: 'Something went wrong'
      })
    } finally {
      setUpdatingMeetingUrl(false)
    }
  }

  return (
    <div className={`ring-1 ring-black/10 rounded-xl p-4 transition-all duration-300 ${
        isExpanded ? 'bg-black/5' : ''
      }`}>
      <div className="flex divide-x divide-gray-100">
        <div
          className={`flex flex-col items-center text-gray-400 transition-all duration-300 pl-2 pr-6 ${
            isExpanded ? 'text-black' : ''
          }`}>
          <span className="text-xl font-semibold">{dayText}</span>
          <span className="text-4xl font-bold">{dayNumber}</span>
        </div>

        <div className="flex-1 flex max-md:flex-col items-center px-4">
          <div className="flex items-center">
            {/* <Icon icon={"icon-park-solid:check-one"} className="w-6 h-6 text-yale-blue-600" /> */}
            {/* <Icon icon={"material-symbols:timer-rounded"} className="w-6 h-6 text-gray-400" /> */}
          </div>
          <div className={`flex-1 flex md:px-3 text-gray-600 ${isExpanded ? 'text-black' : ''}`}>
            <span className='pl-2'>{summary}</span>
          </div>
        </div>
        <button
          className="bg-gray-50 hover:bg-gray-100 rounded text-gray-400 transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronDown className={`transition-all duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
        </button>
      </div>
      
      <div className={`overflow-hidden font-light transition-all duration-1000 ease-in-out ${
          isExpanded ? 'max-h-[999px]' : 'max-h-0 duration-500'
        }`}>
        <div className="pt-3 grid md:grid-cols-2 gap-2">
          <div className="grid md:grid-cols-4 bg-white rounded-lg p-2">
            <span className="text-gray-400">Specialist</span>
            <span className="md:col-span-3 text-gray-600">
              {specialization || 'Not sure yet'}
            </span>
          </div>
          <div className="grid md:grid-cols-4 bg-white rounded-lg p-2">
            <span className="text-gray-400">Issue Summary</span>
            <span className="md:col-span-3 text-gray-600">
              {consultationSummary || 'No summary provided'}
            </span>
          </div>
          <div className="grid md:grid-cols-4 bg-white rounded-lg p-2">
            <span className="text-gray-400">Meeting</span>
            {meetingLink ? <a href={meetingLink} target='_blank' className="md:col-span-3 text-gray-600 truncate underline">
              {meetingLink}
            </a> : <span className="md:col-span-3 text-gray-600">No meeting link</span>}
          </div>

          {isSpecialist && (status === BookingStatus.PENDING) && <button
            onClick={handleAccept}
            className="bg-yale-blue text-white rounded-lg p-2
            transition-all duration-300 ease-in-out md:row-start-3">
            {updatingStatus ? 'Updating...' : 'Accept'}
          </button>}
          {isPatient && (status === BookingStatus.UPCOMING || status === BookingStatus.PENDING) && <button
            onClick={handleCancel}
            className="bg-white hover:bg-red-300 rounded-lg p-2 transition-all
            duration-300 ease-in-out md:row-start-3">
            {updatingStatus ? 'Updating...' : 'Cancel'}
          </button>}
          {isSpecialist && (status !== BookingStatus.PENDING) && <button
            onClick={handleSetMeetingLink}
            className="bg-yale-blue text-white rounded-lg p-2
            transition-all duration-300 ease-in-out md:row-start-3
            flex max-md:flex-col items-center gap-2">
            <input
              value={meetingLinkForm}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setMeetingLinkForm(e.target.value)}
              className='flex-1 rounded-sm outline-none placeholder:text-gray-400
              text-gray-600 px-1 w-full'
              placeholder='Meeting url'
              type="url"
            />
            <span>{updatingMeetingUrl ? 'Updating...' : 'Set meeting link'}</span>
          </button>}
        </div>
      </div>
    </div>
  );
}