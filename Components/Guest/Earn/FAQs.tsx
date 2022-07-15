import faqsIcon from "images/icons/FAQ.svg";
import styles from "styles/Components/Guest/Earn/FAQs.module.scss";
import FAQItem from "./Partials/FAQItem";
import SectionHeader from "Components/Guest/Global/SectionHeader";
import { IFAQItem } from "types";
import { useEffect, useState } from "react";


export default function FAQs({ faqs }: { faqs: Array<IFAQItem> }) {

  const [fadeInCounter, setFadeInCounter] = useState<number>(-1);

  useEffect(() => {
    const handleScroll: () => void = () => {
      const element = document.querySelector(`#faqs`) as HTMLElement;
      if (!element)
        return;
      const windowScreenEnd = window.scrollY + window.innerHeight;
      if (windowScreenEnd < element.offsetTop) {
        setFadeInCounter(-1);
        return;
      }
      if (windowScreenEnd > element.offsetTop + element.offsetHeight) {
        setFadeInCounter(faqs.length);
        return;
      }
      const counterChangeSize = element.offsetHeight / (faqs.length + 1);
      const counter = Math.floor((windowScreenEnd - element.offsetTop) / counterChangeSize);
      if (counter !== fadeInCounter)
        setFadeInCounter(counter);
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, []);

  return <section id="faqs" className={styles.FAQs}>
    <SectionHeader icon={faqsIcon}><span className="text-primary">FAQ</span></SectionHeader>
    <div className="row">
      {faqs.map((faq, idx) => {
        const transition = {
          transition: `all 0.3s`
        };
        const fadedOut = {
          transform: `translate(-${100 * (idx + 1)}%, 0)`,
          opacity: "0",
          ...transition
        };
        return <FAQItem key={JSON.stringify(faq)} {...faq} active={idx===0} style={fadeInCounter <= idx ? fadedOut : transition} />
      })}
    </div>
  </section>
}