'use client';

import { useState, useMemo } from 'react';
import moment from 'moment';
import { ChevronDown } from 'lucide-react';
import { BookingData } from '@/types/booking';
import { Icon } from '@iconify/react';

type PaymentCardProps = {
  isSpecialist: boolean
  isPatient: boolean
} & Pick<BookingData, 'date' | 'specialization' | 'consultationSummary' | 'meetingLink'>

export default function PaymentCard({
  date,
  consultationSummary,
  specialization,
  meetingLink,
  isSpecialist,
  isPatient
}: PaymentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dayText = useMemo(() => moment(date).format('ddd'), [date]);
  const dayNumber = useMemo(() => moment(date).format('D'), [date]);
  
  const summary = useMemo(() => {
    return specialization ?
      `I need to see a ${specialization}` :
      `Summary: ${consultationSummary}`
  }, [specialization, consultationSummary]);

  const meetingLinkDetails = useMemo(() => {
    return meetingLink ? meetingLink : 'Link Not provided yet'
  }, [meetingLink]);

  return (
    <div
      className={`ring-1 ring-black/10 rounded-xl p-4 transition-all duration-300 ${
        isExpanded ? 'bg-black/5' : ''
      }`}
    >
      <div className="flex divide-x divide-gray-100">
        <div
          className={`flex flex-col items-center text-gray-400 transition-all duration-300 pl-2 pr-6 ${
            isExpanded ? 'text-black' : ''
          }`}
        >
          <span className="text-xl font-semibold">{dayText}</span>
          <span className="text-4xl font-bold">{dayNumber}</span>
        </div>

        <div className="flex-1 flex max-md:flex-col items-center px-4">
          <div className={`flex-1 flex md:px-3 text-gray-600 ${isExpanded ? 'text-black' : ''}`}>
            <span className='pl-2'>{summary}</span>
          </div>
        </div>
        <button
          className="bg-gray-50 hover:bg-gray-100 rounded text-gray-400 transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown className={`transition-all duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
        </button>
      </div>
      
      <div
        className={`overflow-hidden font-light transition-all duration-1000 ease-in-out ${
          isExpanded ? 'max-h-[999px]' : 'max-h-0 duration-500'
        }`}
      >
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
            <span className="md:col-span-3 text-gray-600 truncate">
              {meetingLinkDetails}
            </span>
          </div>

          {isSpecialist && <button
            className="bg-yale-blue text-white rounded-lg p-2
            transition-all duration-300 ease-in-out md:row-start-3">
            Accept
          </button>}
          {isPatient && <button
            className="bg-white hover:bg-red-300 rounded-lg p-2 transition-all
            duration-300 ease-in-out md:row-start-3">
            Cancel
          </button>}
        </div>
      </div>
    </div>
  );
}