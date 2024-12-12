type Props = {
  className?: string,
  color?: string
} & React.SVGProps<SVGSVGElement>

const Grain = ({ className='', color='#ffffff', ...props }: Props) => {
  return (
    <svg
      {...props}
      className={`pointer-events-none ${className}`}
      viewBox="0 0 700 700"
      opacity="1">
      <defs>
        <filter
          id="nnnoise-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="linearRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.156"
            numOctaves="4"
            seed="15"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>
          <feSpecularLighting
            surfaceScale="12"
            specularConstant="1"
            specularExponent="20"
            lightingColor={color}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            result="specularLighting"
          >
            <feDistantLight azimuth="3" elevation="100"></feDistantLight>
          </feSpecularLighting>
          <feColorMatrix
            type="saturate"
            values="0"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="specularLighting"
            result="colormatrix"
          ></feColorMatrix>
        </filter>
      </defs>
      <rect width="700" height="700" fill="transparent"></rect>
      <rect
        width="700"
        height="700"
        fill={color}
        filter="url(#nnnoise-filter)"
      ></rect>
    </svg>
  )
}

export default Grain