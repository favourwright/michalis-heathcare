import Header from "@/components/guest/Header";
import Footer from "@/components/guest/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

export default layout