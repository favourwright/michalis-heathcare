import DefaultMaxWidth from "@/components/DefaultMaxWidth"
import { useGSAP } from "@gsap/react"
import { useMemo, useRef, useState } from "react"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type"
import CustomAudioPlayer from "@/components/CustomAudioPlayer"

gsap.registerPlugin(useGSAP,ScrollTrigger);
const WaitingRoom = () => {
  const waitingRoomRef = useRef(null)
  const sectionRef = useRef(null)
  const stageRef = useRef(null)

  const [pinProgress, setPinProgress] = useState(0)
  const progressWidth = useMemo(() => {
    if (!pinProgress) return 0
    return pinProgress * 100
  }, [pinProgress])

  useGSAP(()=>{
    const tl = gsap.timeline()

    const heroText = new SplitType(waitingRoomRef.current!, { types: 'chars' })
    const charsToAnimate = heroText.chars?.slice(15, 17)!
    gsap.set(charsToAnimate, { autoAlpha: 1 })

    tl.from(
      charsToAnimate,
      {
        y: '-200px',
        stagger: 0.1,
        ease: 'bounce.inOut',
        scrollTrigger: {
          trigger: waitingRoomRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 2,
        }
      }
    )

    tl.to(
      sectionRef.current,
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          id: 'pin',
          start: 'top top',
          end: '+=300%',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            setPinProgress(self.progress)
          }
        }
      },
    )

    // tl.fromTo(
    //   stageRef.current,
    //   {
    //     opacity: 0,
    //   },
    //   {
    //     opacity: 1,
    //     scrollTrigger: {
    //       trigger: stageRef.current,
    //       start: 'top center',
    //       end: 'top 20%',
    //       toggleActions: 'play none none reverse',
    //     }
    //   },
    //   '<'
    // )
  })

  return (
    <div ref={sectionRef} className="min-h-[calc(100svh+2px)] flex bg-dark overflow-hidden">
      <DefaultMaxWidth
        tag="div"
        className="w-full flex flex-col items-end gap-8 py-2
        relative overflow-visible">
        <span className="relative z-10">
          <h1
            ref={waitingRoomRef}
            className="text-5xl font-bold text-primary">
            virtual waiting room
          </h1>
          {/* outlined */}
          <h1
            className="absolute text-5xl top-0 font-bold text-white/10">
            virtual waiting room
          </h1>
        </span>

        <div
          ref={stageRef}
          className="flex-1 w-full rounded-3xl bg-primary/10
          transition-all duration-1000 relative overflow-hidden
          flex p-3 md:p-8">
          <div className="flex-1 grid md:grid-cols-7 text-white">
            <div className="md:col-span-2">
              hey
            </div>
            <div className="md:col-span-5 h-full flex items-end justify-end">
              <CustomAudioPlayer />
            </div>
          </div>
          {/* pin progress */}
          <span
            style={{width: progressWidth+'%'}}
            className="absolute left-0 bottom-0 h-1 bg-primary rounded-lg"
          />
        </div>
      </DefaultMaxWidth>
    </div>
  )
}

export default WaitingRoom