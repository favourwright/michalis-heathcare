'use client';

import { useState, useMemo } from 'react';
import moment from 'moment';
import Link from 'next/link';
// import { CoinPayment } from '@/types';
// import { tokens } from '@/utils/constants';
import { ChevronDown } from 'lucide-react';

type PaymentCardProps = {
  createdAt: Date;
  amount: number;
  // token: CoinPayment;
  requestId: number;
  sellerId: number;
  buyerId: number;
  isSeller: boolean;
};

export default function PaymentCard({
  createdAt,
  amount,
  // token,
  requestId,
  sellerId,
  buyerId,
  isSeller,
}: PaymentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dayText = useMemo(() => moment(createdAt).format('ddd'), [createdAt]);
  const dayNumber = useMemo(() => moment(createdAt).format('D'), [createdAt]);
  // const tokenDetails = useMemo(() => tokens.find((t) => t.symbol === token), [token]);

  const moreDetails = useMemo(() => {
    return {
      amount,
      // token,
      request: requestId,
      'my id': isSeller ? sellerId : buyerId,
      date: createdAt.toString(),
    };
  }, [amount, requestId, sellerId, buyerId, isSeller, createdAt]);
  // }, [amount, token, requestId, sellerId, buyerId, isSeller, createdAt]);

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

        <div className="flex-1 flex max-md:flex-col">
          <div className="flex items-center">
            <span
              className={`mx-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center opacity-50 ${
                isExpanded ? 'opacity-100' : ''
              }`}
            >
              logo
              {/* {tokenDetails?.logo && <img src={tokenDetails.logo} alt="token" className="object-contain h-10" />} */}
            </span>
          </div>

          <div className={`flex-1 flex items-center px-3 text-gray-600 ${isExpanded ? 'text-black' : ''}`}>
            {isSeller ? (
              <>
                {/* You got paid {amount} {tokenDetails?.symbol} for request */}
                You got paid {amount} USDC for request
                <Link href={`/requests/${requestId}`} className="pl-2 hover:underline">
                  #{requestId}
                </Link>
              </>
            ) : (
              <>
                {/* You paid {amount} {tokenDetails?.symbol} for request */}
                You paid {amount} USDC for request
                <Link href={`/requests/${requestId}`} className="pl-2 hover:underline">
                  #{requestId}
                </Link>
              </>
            )}
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
          {Object.entries(moreDetails).map(([key, value]) => (
            <div key={key} className="grid md:grid-cols-4 bg-white rounded-lg p-2">
              <span className="text-gray-400">{key}</span>
              <span className="md:col-span-3 text-gray-600">
                {key === 'request' ? (
                  <Link href={`/requests/${value}`} className="pl-2 hover:underline">
                    #{value}
                  </Link>
                ) : (
                  value as string
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}