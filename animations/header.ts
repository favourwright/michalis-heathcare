import { gsap } from "gsap";

export const animateHeader = () => {
  gsap.set('[data-bg]', {autoAlpha: 0, backgroundColor: '#fff'})
  gsap.set('[data-logo-text]', { xPercent: -85, autoAlpha: 1 })

  const tl = gsap.timeline({
    scrollTrigger: {
      start: 'top+=200',
      end: '+=1',
      toggleActions: 'play none none reverse',
      scrub: 2,
    }
  })

  tl
    .to('[data-bg]', { autoAlpha: 1 })
    .to('[data-logo-text]', { xPercent: 0 })

  return tl
}

export const animateHeaderLine = () => {
  const tl = gsap.timeline();
  gsap.set('[data-hr]', { scaleX: 0 });
  const hero = document.querySelector('[data-hero]')

  tl.to('[data-hr]', {
    autoAlpha: 1,
    scaleX: 1,
    scrollTrigger: {
      trigger: hero,
      start: 'bottom top',
      end: '+=1',
      toggleActions: 'play none none reverse',
      scrub: 2,
    },
  });

  return tl;
};