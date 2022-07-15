import Footer from "Components/Guest/Layout/Footer";
import Header from "Components/Guest/Layout/Header";
import { ReactNode } from "react";
import { ISocialItem } from "types";

export default function Guest({ socials, children }: { socials: Array<ISocialItem>, title?: string, children: ReactNode }) {

  return (
    <>
      <Header socials={socials} />
      <section className="content">
        {children}
      </section>
      <Footer socials={socials} />
    </>
  )
}
