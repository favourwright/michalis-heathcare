import { JSX, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  colors?: {
    base: string;
    accent: string;
  }
};

const RevealedText = ({
  children,
  tag: Tag = 'p',
  className,
  colors = {
    base: 'rgba(30,41,59,0.1)',
    accent: 'rgb(30,41,59)',
  }
}: Props) => {
  const textRef = useRef<HTMLElement | null>(null); 

  useEffect(() => {
    if (!textRef.current) return;

    const splitType = new SplitType(textRef.current, {
      types: 'chars',
    });

    gsap.fromTo(splitType.chars,
      {
        color: colors.base,
      },
      {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
        color: colors.accent,
        stagger: 0.1,
        ease: 'power3.inOut',
      }
    );

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      splitType.revert();
    };
  }, []);

  return (
    // @ts-ignore
    <Tag ref={textRef} className={`revealed-text overflow-hidden ${className}`}>
      {children}
    </Tag>
  );
};

export default RevealedText;
