export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      spotlight layout
      <div>{children}</div>
    </div>
  );
}