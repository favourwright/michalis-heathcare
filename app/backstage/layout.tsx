export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      backstage layout
      <div>{children}</div>
    </div>
  );
}