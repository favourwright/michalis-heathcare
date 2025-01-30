'use client';
import Header from "@/components/guest/Header";
import Footer from "@/components/guest/Footer";
import GetStarted from "@/components/GetStarted";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header/>
      <main className="flex-1">{children}</main>
      <GetStarted />
      <Footer/>
    </>
  )
}

export default layout