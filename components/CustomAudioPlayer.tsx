import React, { useEffect, useMemo, useRef, useState } from 'react';
import useCalmingMusic from "@/hooks/useCalmingMusic";
import { Icon } from '@iconify/react';

const CustomAudioPlayer: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useCalmingMusic();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const tracks = useMemo(() => {
    return (data?.results || [])
  }, [data]);

  useEffect(() => {
    if(!audioRef.current) return
    if(!tracks.length) return

    audioRef.current.src = tracks[currentTrackIndex].audio;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying, tracks]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if(isLoading || isError) return
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(prev=>!prev);
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentTrackIndex((prevIndex) =>
      (prevIndex - 1 + tracks.length) % tracks.length
    );
  };



const [paymentSuccessful, setPaymentSuccessful] = useState(false)
const handleCompletion = (data:any)=> {
  console.log(data);
  if (data?.status?.toLowerCase() === "successful") {
    setPaymentSuccessful(true);  // Set flag to true on success
    console.log(data.message ?? "Payment successful");
  } else {
    console.error(data.message ?? "Payment failed, please try again");
  }
}
const handleError = (error:any) => {
  console.error(error.message ?? "Payment attempt failed, please try again");
}
const payWithTransactpay = (e: React.MouseEvent) => {
  e.preventDefault()
  setPaymentSuccessful(false);  // Reset flag each time payment is initiated
  const Checkout = new (window as any).CheckoutNS.PaymentCheckout({
    firstName: "Adedayo",
    lastName: "Bolaji",
    mobile: "09087658836",
    country: "NGN",
    email: "Adedayo@gmail.com",
    currency: "NGN",
    amount: 10,
    reference: new Date().getTime().toString(),
    merchantReference: "65656565656565656565656",
    description: "Payment for services",
    redirectUrl: "https://google.com",
    apiKey:'PGW-PUBLICKEY-TEST-568BA3308E1748EFB30330949433B6A6',
    encryptionKey:'NDA5NiE8UlNBS2V5VmFsdWU+PE1vZHVsdXM+elNCNDlQQURIM0JtWXFJQmdQcncrTlhFY3JYQm5EVUorK1A2UG8rV2JTNzIzdmt5dXVIRUtYbmpKa3JkTkNEZld4NDk4MDMweXhDVWZneS94MGRSYTNzRUdhdHg0TXJyd3gvUDNsWnR2dTJiL1h1a1VJdGoyOWVKbW83d1J4STRDR1FVZ3hSSEhDWkZta1Z6WGVlcFo3eU9xMUJlS1ZCczJaUG9qa0R5cUROc3FCaE96b1dkaEMvV0JLKy9KUElaN1A4MVgxUUtrbU5Kem1ldTd5VU9RRlY4ZW5mYVBNNmRvUXpvZ0xwQStLWk5rMjZrM2FYNkhIMjNnNnZUYkJUNTU0ZHVVTHQ0YXZTQ25CcnUrL092LzhGNjFjRm4yemRPMzhJU2Jlbnl1d3MzRGI3aHJDYzNoYis5dTJPNUZibjBLa3h1M0NQeHBsMEVad1MvMCt0a1A1ZitzaStLaFF6THdLS0lDK01tWnpRdjR6Vi82NEpEKzQxWGY1U0gyN1NCV01qdVhQTzV3VW5LaDhzdm95V1ZFME85ZmdSMDZNdk1yM0s5N2QxbHRhdWdwakZnNEtycEI1Z0ltL2FqTWVSNnUwTDQzZFVBY0R6aTZpaEVtRjU3aFlDRWwzdHhabVdqNUtUODRhRzljNEpHMnJxajVFL3UyajhBbEFtbURmUTdqK0N3M1ZubVFpWnNoR2k1ekVkMkwrVUQwbDZZMXhKMHhaTUNpdjNJNTFUdm5pWXBXWDJZL0tlZ0RWN09HSlR5RE9SL0xiS3V2T3ZjYzdYakFXMlo3eW51ejN6dXMyS2FPU01ZcFl1Qk1yL3E1RHJCRHpibUs1K0laUDdGMVZmQlFEVE1yWFh1Yi8rbFg3ZXNQRkFscXZZQjhhS0xGUTcwRnpsY0lMNW1DTWs9PC9Nb2R1bHVzPjxFeHBvbmVudD5BUUFCPC9FeHBvbmVudD48L1JTQUtleVZhbHVlPg==',
    onCompleted: handleCompletion,
    onClose: () => {
        if (!paymentSuccessful) {
            console.error("Payment cancelled, Please refresh");
        }
    },
    onError: handleError,
  });
  Checkout.init();
}

  return (
    <div
      onClick={handlePlayPause}
      title={`${tracks[currentTrackIndex]?.name} by ${tracks[currentTrackIndex]?.artist_name}`}
      className='group bg-white rounded-lg p-4 active:scale-[.99]
      transition-all duration-300 ease-in-out
      overflow-hidden select-none cursor-pointer'>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-between'>
          <button
            onClick={handlePlayPause}
            className='outline-none bg-dark/20 rounded-md p-1'>
            <Icon
              className={`transition-all duration-300 text-xl
                ${isPlaying ? 'text-rose-600/80' : 'text-text/80'}`}
              icon={isPlaying ? "mingcute:stop-fill" : "mingcute:play-fill"}
            />
          </button>
          
          <div className='flex gap-2'>
            <button
              onClick={handlePrevious}
              className='outline-none bg-dark/20 rounded-md
              md:translate-y-[-100px] group-hover:translate-y-0
              transition-all duration-1000'>
              <Icon
                className="text-xl text-text/80"
                icon="basil:skip-prev-solid"
              />
            </button>
            <button
              onClick={handleNext}
              className='outline-none bg-dark/20 rounded-md
              md:translate-y-[-100px] group-hover:translate-y-0
              transition-all duration-1000 delay-100'>
              <Icon
                className="text-xl text-text/80"
                icon="basil:skip-next-solid"
              />
            </button>
          </div>

          <audio
            ref={audioRef}
            onEnded={handleEnded}
            autoPlay={isPlaying}
            preload="auto"
          />
        </div>

        <div className='flex items-center text-text gap-8'>
          <div>
            {!isError && !isLoading && <h2 className='max-w-60 truncate'>
              {tracks[currentTrackIndex]?.name} by {tracks[currentTrackIndex]?.artist_name}
            </h2>}
            {isLoading && <span className='flex items-center gap-2'>
              <Icon className='animate-spin text-2xl text-text' icon="humbleicons:spinner-earring" />
              <span>Loading...</span>
            </span>}
            {isError && <span className='flex items-center gap-2'>
              <Icon className='text-2xl text-text' onClick={()=>refetch()} icon="lucide:refresh-ccw" />
              <span>{error.message}</span>
            </span>}
          </div>

          <div className='flex gap-2 text-xl'>
            <Icon className='text-amber-500' icon='lucide:moon' />
            <Icon className='text-accent' icon='lucide:leaf' />
            <Icon className='text-accent-teal' icon='lucide:music' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;