import { gsap } from "gsap";
import SplitType from "split-type";

export const animateHeroText = () => {
  gsap.set('[data-hero-text]', {autoAlpha: 1})
  gsap.set('[data-hero-text] p', {autoAlpha: 0})
  const tl = gsap.timeline({})

  const hq = gsap.utils.selector('[data-hero-text]')
  const heroText = new SplitType(hq('h1'), { types: 'lines' })

  // text intro animation
  tl.from(heroText.lines, {
    xPercent: -110,
    ease: 'power2.inOut',
    duration: 1.4,
    stagger: {
      each: 0.1,
    },
  })
  tl.to('[data-hero-text] p', {
    autoAlpha: 1,
    ease: 'power2.inOut',
    duration: 1,
  })

  // animate hero text on scroll
  tl.to(heroText.lines, {
    scrollTrigger: {
      trigger: '[data-hero]',
      start: "top 30%",
      end: "bottom top",
      scrub: true,
    },
    y: '-100%',
    scale: 1.2,
    ease: 'power3.inOut',
    stagger: {
      each: 0.02,
    },
  })

  // animate entire section
  tl.to(['[data-hero]'], {
    scrollTrigger: {
      trigger: '[data-hero]',
      start: "top+=10%",
      end: "bottom top",
      scrub: true,
    },
    yPercent: 10,
    ease: 'power3.inOut',
  })

  return tl
}