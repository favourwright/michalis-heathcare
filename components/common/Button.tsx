type Props = {
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="text-center px-4 md:px-6 py-1 md:py-2 rounded-full outline-none
      ring-2 font-semibold ring-mindaro text-mindaro bg-yale-blue">
      {children || "Button"}
    </button>
  )
}

export default Button