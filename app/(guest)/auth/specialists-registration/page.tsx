'use client'
import DefaultMaxWidth from "@/components/common/DefaultMaxWidth"

const Auth = () => {
  return (
    <div className="min-h-svh pt-20 md:pt-28">
      <DefaultMaxWidth
        tag="div"
        className="w-full flex flex-col gap-3">
        <div
          className="text-clamp-sm md:text-clamp-md font-bold leading-none
          text-yale-blue-400 overflow-hidden">
          <span className="flex items-center whitespace-nowrap gap-2">
            <hr className="w-20 border-mindaro-300 border-2" />
            <h2 className="inline-flex">Expand Your Practice<span className="text-mindaro-300">.</span></h2>
          </span>
          <h2>Connect with More Patients<span className="text-mindaro-300">.</span></h2>
        </div>


      </DefaultMaxWidth>
    </div>
  )
}

export default Auth