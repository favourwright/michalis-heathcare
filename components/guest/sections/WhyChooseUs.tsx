import RevealedText from "@/components/animated/RevealedText"
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"

const WhyChooseUs = () => {
  const appNameAlias = process.env.APP_NAME_ALIAS

  return (
    <div className="min-h-svh bg-yellow-50 flex items-center">
      <DefaultMaxWidth>
        <h1
          className="[font-size:_clamp(4em,6vw,12em)]
          font-bold text-secondary-cyan leading-tight">
          Why Choose {appNameAlias}?
        </h1>
        <RevealedText
          colors={{
            base: 'rgba(30,41,59,0.1)',
            accent: 'rgba(30,41,59,0.8)',
          }}
          className="[font-size:_clamp(4em,5vw,12em)] text-text leading-tight mt-10">
          Our platform lets you book healthcare appointments 24/7 without phone calls,
          giving you access to a wide network of professionals. With instant
          confirmation, you can quickly schedule and manage your appointments hassle-free.
        </RevealedText>
      </DefaultMaxWidth>
    </div>
  )
}

export default WhyChooseUs