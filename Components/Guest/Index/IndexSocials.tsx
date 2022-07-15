import socialsIcon from "images/icons/socials.svg";
import { useEffect, useState } from "react";
import styles from "styles/Components/Guest/Index/IndexSocials.module.scss";
import { ISocialItem } from "types";
import SectionHeader from "../Global/SectionHeader";
import SocialItem from "./Partials/SocialItem";

export default function Socials({ socials }: { socials: Array<ISocialItem> }) {
  const [fadeInCounter, setFadeInCounter] = useState<number>(-1);
  const INTRO_SOCIALS = [
    "discord",
    "twitter"
  ];

  useEffect(() => {
    const handleScroll: () => void = () => {
      const element = document.querySelector(`#socials`) as HTMLElement;
      if (!element)
        return;
      const windowScreenEnd = window.scrollY + window.innerHeight;
      if (windowScreenEnd < element.offsetTop) {
        setFadeInCounter(-1);
        return;
      }
      if (windowScreenEnd > element.offsetTop + element.offsetHeight) {
        setFadeInCounter(socials.length);
        return;
      }
      const counterChangeSize = element.offsetHeight / (socials.length + 1);
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

  return <section id="socials" className={styles.Socials}>
    <SectionHeader icon={socialsIcon}>
      Social <span className="text-primary">Media</span>
    </SectionHeader>
    <div className="row">
      {socials.filter(social => INTRO_SOCIALS.findIndex(s => s === social.media.toLowerCase()) > -1).map((social, idx) => {
        const transition = {
          transition: `all 0.3s`
        };
        const fadedOut = {
          transform: `translate(${100 * (idx + 1)}%, 0)`,
          opacity: "0",
          ...transition
        };

        return <SocialItem key={JSON.stringify(social)} image={social.image} social={social.media} link={social.link} style={fadeInCounter <= idx ? fadedOut : transition} />;
      })}
    </div>
  </section>
}