import { JSX } from "react";

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  paddingSides?: string;
  withPadding?: boolean;
  children: React.ReactNode;
} & JSX.IntrinsicElements[keyof JSX.IntrinsicElements];

const sides: Record<string, string> = {
  a: 'p-5 md:p-14',
  t: 'pt-5 md:pt-14',
  r: 'pr-5 md:pr-14',
  b: 'pb-5 md:pb-14',
  l: 'pl-5 md:pl-14',
  x: 'px-5 md:px-14',
  y: 'py-5 md:py-14',
};

const PaddingComponent = ({
  tag: Tag = 'section',
  paddingSides,
  withPadding = true,
  children,
  className,
}: Props) => {
  const getPaddingClasses = (): string => {
    if (!paddingSides) {
      return sides.a;
    }

    return Array.from(paddingSides)
      .map(char => sides[char.toLowerCase()])
      .filter(Boolean)
      .join(' ');
  };

  const defaultPadding = withPadding ? getPaddingClasses() : '';

  return (
    <Tag
      className={`${defaultPadding} max-w-8xl mx-auto ${className}`}>
      {children}
    </Tag>
  );
};

export default PaddingComponent;